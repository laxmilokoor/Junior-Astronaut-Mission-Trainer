"""FastAPI service for the NASA Junior Astronaut Mission Trainer."""

import os
from copy import deepcopy
from datetime import datetime, timezone
from threading import Lock
from typing import Literal
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, Field


RESOURCE_NAMES = ("oxygen", "water", "food", "power", "health")
MISSION_RESOURCES = {
    "moon": {"oxygen": 90, "water": 85, "food": 85, "power": 90, "health": 100},
    "mars": {"oxygen": 80, "water": 75, "food": 80, "power": 85, "health": 100},
}

app = FastAPI(
    title="NASA Junior Astronaut Mission Trainer",
    description="Backend API for the astronaut mission simulation",
    version="1.0.0",
)

default_origins = (
    "http://localhost:5173,http://127.0.0.1:5173,"
    "http://localhost:5174,http://127.0.0.1:5174"
)
allowed_origins = [
    origin.strip()
    for origin in os.getenv("NASA_MISSION_CORS_ORIGINS", default_origins).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "PUT", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

mission_resources = deepcopy(MISSION_RESOURCES["moon"])
mission_history = []
active_mission_id = None
state_lock = Lock()


class ResourceSet(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)

    oxygen: int = Field(ge=0, le=100)
    water: int = Field(ge=0, le=100)
    food: int = Field(ge=0, le=100)
    power: int = Field(ge=0, le=100)
    health: int = Field(ge=0, le=100)


class ResourceUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)

    oxygen: int = Field(default=0, ge=-100, le=100)
    water: int = Field(default=0, ge=-100, le=100)
    food: int = Field(default=0, ge=-100, le=100)
    power: int = Field(default=0, ge=-100, le=100)
    health: int = Field(default=0, ge=-100, le=100)


class MissionStartRequest(BaseModel):
    model_config = ConfigDict(extra="forbid", populate_by_name=True)

    mission_id: Literal["moon", "mars"] = Field(alias="missionId")
    resources: ResourceSet | None = None


class MissionEndRequest(BaseModel):
    model_config = ConfigDict(extra="forbid", populate_by_name=True)

    mission_id: str | None = Field(default=None, alias="missionId")
    status: Literal["completed", "failed"]
    resources: ResourceSet | None = None
    fail_reason: str | None = Field(default=None, alias="failReason", max_length=500)
    score: int | None = Field(default=None, ge=0, le=100)


def current_time():
    return datetime.now(timezone.utc).isoformat()


def get_resources_copy():
    return deepcopy(mission_resources)


@app.get("/")
def home():
    return {"message": "NASA Junior Astronaut Mission Trainer Backend is running!"}


@app.get("/api/status")
def get_status():
    with state_lock:
        active = next(
            (record for record in mission_history if record["id"] == active_mission_id),
            None,
        )
        if active:
            mission_status = active["status"]
        elif mission_history:
            mission_status = mission_history[-1]["status"]
        else:
            mission_status = "idle"
        return {
            "status": "online",
            "application": "Junior Astronaut Mission Trainer",
            "missionStatus": mission_status,
        }


@app.get("/api/resources")
def get_resources():
    with state_lock:
        return {"resources": get_resources_copy()}


@app.put("/api/resources")
def set_resources(resources: ResourceSet):
    global mission_resources

    with state_lock:
        mission_resources = resources.model_dump()
        return {
            "message": "Mission resources replaced successfully",
            "resources": get_resources_copy(),
        }


@app.post("/api/resources/update")
def update_resources(update: ResourceUpdate):
    with state_lock:
        for resource, amount in update.model_dump().items():
            mission_resources[resource] = max(
                0, min(100, mission_resources[resource] + amount)
            )
        return {
            "message": "Resources updated successfully",
            "resources": get_resources_copy(),
        }


@app.post("/api/mission/start")
def start_mission(request: MissionStartRequest):
    global active_mission_id, mission_resources

    with state_lock:
        if active_mission_id is not None:
            for record in mission_history:
                if record["id"] == active_mission_id:
                    record["status"] = "abandoned"
                    record["endedAt"] = current_time()
                    record["failReason"] = "Mission replaced by a new mission."
                    record["resources"] = get_resources_copy()
                    break

        mission_resources = (
            request.resources.model_dump()
            if request.resources
            else deepcopy(MISSION_RESOURCES[request.mission_id])
        )
        active_mission_id = str(uuid4())
        record = {
            "id": active_mission_id,
            "missionId": request.mission_id,
            "status": "active",
            "startedAt": current_time(),
            "endedAt": None,
            "resources": get_resources_copy(),
            "failReason": None,
            "score": None,
        }
        mission_history.append(record)
        return {"message": "Mission started successfully", "mission": deepcopy(record)}


@app.get("/api/mission/history")
def get_mission_history():
    with state_lock:
        return {"history": deepcopy(list(reversed(mission_history)))}


@app.post("/api/mission/end")
def end_mission(request: MissionEndRequest):
    global active_mission_id, mission_resources

    with state_lock:
        if active_mission_id is None:
            raise HTTPException(status_code=409, detail="There is no active mission.")

        record = next(
            (item for item in mission_history if item["id"] == active_mission_id),
            None,
        )
        if record is None:
            raise HTTPException(status_code=409, detail="Active mission record is missing.")
        if request.mission_id and request.mission_id != record["missionId"]:
            raise HTTPException(status_code=409, detail="Mission ID does not match the active mission.")

        if request.resources is not None:
            mission_resources = request.resources.model_dump()

        record["status"] = request.status
        record["endedAt"] = current_time()
        record["resources"] = get_resources_copy()
        record["failReason"] = request.fail_reason
        record["score"] = request.score
        active_mission_id = None
        return {"message": "Mission ended successfully", "mission": deepcopy(record)}
