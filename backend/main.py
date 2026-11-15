
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="NASA Junior Astronaut Mission Trainer",
    description="Backend API for the astronaut mission simulation",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initial mission resources
mission_resources = {
    "oxygen": 100,
    "water": 100,
    "food": 100,
    "power": 100
}


@app.get("/")
def home():
    return {
        "message": "NASA Junior Astronaut Mission Trainer Backend is running!"
    }


@app.get("/api/status")
def get_status():
    return {
        "status": "online",
        "application": "Junior Astronaut Mission Trainer"
    }


@app.get("/api/resources")
def get_resources():
    return {
        "message": "Mission resources retrieved successfully",
        "resources": mission_resources
    }

from pydantic import BaseModel, Field


class ResourceUpdate(BaseModel):
    oxygen: int = Field(default=0, ge=0, le=100)
    water: int = Field(default=0, ge=0, le=100)
    food: int = Field(default=0, ge=0, le=100)
    power: int = Field(default=0, ge=0, le=100)


@app.post("/api/resources/update")
def update_resources(update: ResourceUpdate):

    updates = update.model_dump()

    for resource, amount in updates.items():
        mission_resources[resource] = max(
            0,
            mission_resources[resource] - amount
        )

    return {
        "message": "Resources updated successfully",
        "resources": mission_resources
    }
