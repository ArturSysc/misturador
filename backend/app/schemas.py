from pydantic import BaseModel
from datetime import datetime

class SensorDataBase(BaseModel):
    emergency_status: bool
    agua: bool
    valvula_vapor_percentage: float
    valvula_agua_percentage: float
    temperatura_celsius: float

class SensorDataCreate(SensorDataBase):
    pass

class SensorData(SensorDataBase):
    id: int
    timestamp: datetime

    class Config:
        orm_mode = True