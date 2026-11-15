# NASA Junior Astronaut Mission Trainer

An interactive React game for practicing resource management on Moon and Mars missions. The FastAPI service tracks the current mission, five life-support resources, and mission history. The game remains playable using its local simulation if the API is unavailable.

## Requirements

- Python 3.10 or newer
- Node.js 18 or newer and npm

## Run locally

Open two terminals from the project root.

### 1. Start the FastAPI backend

```powershell
py -m venv backend\venv
backend\venv\Scripts\Activate.ps1
python -m pip install -r backend\requirements.txt
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8002
```

The API is available at `http://127.0.0.1:8002`. Interactive API documentation is at `http://127.0.0.1:8002/docs`.

### 2. Start the Vite frontend

```powershell
Copy-Item frontend\.env.example frontend\.env.local
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite (by default, `http://localhost:5173`). To use a different backend URL, set `VITE_API_BASE_URL` in `frontend\.env.local` and restart Vite. Add any non-default frontend origin to the comma-separated `NASA_MISSION_CORS_ORIGINS` environment variable before starting the backend.

On macOS or Linux, create/activate the virtual environment with `python3 -m venv backend/venv` and `source backend/venv/bin/activate`; copy the frontend example file with `cp frontend/.env.example frontend/.env.local`.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/` | Backend welcome message |
| `GET` | `/api/status` | API and active mission status |
| `GET` | `/api/resources` | Read oxygen, water, food, power, and health |
| `PUT` | `/api/resources` | Replace all five resources (each value must be 0–100) |
| `POST` | `/api/resources/update` | Apply signed resource deltas; values are clamped to 0–100 |
| `POST` | `/api/mission/start` | Start a Moon or Mars mission and reset its resources |
| `GET` | `/api/mission/history` | Read recent mission records |
| `POST` | `/api/mission/end` | Record a mission as completed or failed |

Mission history is held in memory and is cleared when the backend process restarts. The frontend serializes API mutations to preserve the order of game resource changes; backend failures update the connection indicator but do not stop the local game.

## Tests and production build

From the project root:

```powershell
python -m unittest discover -s backend -p "test_*.py" -v
python -m py_compile backend\main.py
cd frontend
npm run build
```

The API tests cover resource bounds and signed changes, mission reset and history, input validation, and Vite CORS preflight.
