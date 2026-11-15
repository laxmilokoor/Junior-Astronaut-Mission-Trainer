import unittest
from copy import deepcopy

from fastapi.testclient import TestClient

import main


class MissionTrainerApiTests(unittest.TestCase):
    def setUp(self):
        with main.state_lock:
            main.mission_resources = deepcopy(main.MISSION_RESOURCES["moon"])
            main.mission_history.clear()
            main.active_mission_id = None
        self.client = TestClient(main.app)

    def test_root_status_and_initial_resources(self):
        self.assertEqual(self.client.get("/").status_code, 200)
        self.assertEqual(self.client.get("/api/status").json()["status"], "online")
        self.assertEqual(
            self.client.get("/api/resources").json()["resources"],
            main.MISSION_RESOURCES["moon"],
        )

    def test_put_and_signed_updates_clamp_every_resource(self):
        initial = {
            "oxygen": 50,
            "water": 50,
            "food": 50,
            "power": 50,
            "health": 50,
        }
        response = self.client.put("/api/resources", json=initial)
        self.assertEqual(response.status_code, 200)

        response = self.client.post(
            "/api/resources/update",
            json={
                "oxygen": 80,
                "water": -90,
                "food": 5,
                "power": -5,
                "health": 100,
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json()["resources"],
            {"oxygen": 100, "water": 0, "food": 55, "power": 45, "health": 100},
        )

    def test_mission_start_resets_resources_and_records_completion(self):
        self.client.put(
            "/api/resources",
            json={"oxygen": 1, "water": 2, "food": 3, "power": 4, "health": 5},
        )
        started = self.client.post("/api/mission/start", json={"missionId": "moon"})
        self.assertEqual(started.status_code, 200)
        self.assertEqual(started.json()["mission"]["status"], "active")
        self.assertEqual(
            started.json()["mission"]["resources"],
            main.MISSION_RESOURCES["moon"],
        )

        ended = self.client.post(
            "/api/mission/end",
            json={"missionId": "moon", "status": "completed", "score": 84},
        )
        self.assertEqual(ended.status_code, 200)
        self.assertEqual(ended.json()["mission"]["score"], 84)
        self.assertEqual(
            self.client.get("/api/mission/history").json()["history"][0]["status"],
            "completed",
        )
        self.assertEqual(
            self.client.get("/api/status").json()["missionStatus"],
            "completed",
        )

    def test_mission_failure_and_replacement_are_recorded(self):
        self.client.post("/api/mission/start", json={"missionId": "moon"})
        replacement = self.client.post("/api/mission/start", json={"missionId": "mars"})
        self.assertEqual(replacement.status_code, 200)
        history = self.client.get("/api/mission/history").json()["history"]
        self.assertEqual(history[0]["status"], "active")
        self.assertEqual(history[0]["missionId"], "mars")
        self.assertEqual(history[1]["status"], "abandoned")

        ended = self.client.post(
            "/api/mission/end",
            json={
                "missionId": "mars",
                "status": "failed",
                "failReason": "Oxygen depleted",
                "resources": {
                    "oxygen": 0,
                    "water": 50,
                    "food": 50,
                    "power": 50,
                    "health": 50,
                },
            },
        )
        self.assertEqual(ended.status_code, 200)
        self.assertEqual(ended.json()["mission"]["failReason"], "Oxygen depleted")
        self.assertEqual(ended.json()["mission"]["resources"]["oxygen"], 0)

    def test_invalid_inputs_and_ending_without_active_mission_are_rejected(self):
        self.assertEqual(
            self.client.put(
                "/api/resources",
                json={"oxygen": 101, "water": 50, "food": 50, "power": 50, "health": 50},
            ).status_code,
            422,
        )
        self.assertEqual(
            self.client.post("/api/resources/update", json={"oxygen": -101}).status_code,
            422,
        )
        self.assertEqual(
            self.client.post("/api/mission/start", json={"missionId": "jupiter"}).status_code,
            422,
        )
        self.assertEqual(
            self.client.post("/api/mission/end", json={"status": "completed"}).status_code,
            409,
        )

    def test_vite_origin_is_allowed_by_cors(self):
        for origin in ("http://localhost:5173", "http://127.0.0.1:5174"):
            response = self.client.options(
                "/api/status",
                headers={
                    "Origin": origin,
                    "Access-Control-Request-Method": "GET",
                },
            )
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.headers["access-control-allow-origin"], origin)


if __name__ == "__main__":
    unittest.main()
