from pydantic import BaseModel
from datetime import datetime


class SensorDataBase(BaseModel):
    temperatura_celsius: float
    valvula_agua_percentage: int
    valvula_vapor_percentage: int

class SensorDataCreate(SensorDataBase):
    pass

class SensorData(SensorDataBase):
    id: int
    timestamp: datetime

    class Config:
        orm_mode = True