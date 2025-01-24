from pydantic import BaseModel
from datetime import datetime


class SensorDataBase(BaseModel):
    unit_id:int 
    values: list[int]  

class SensorDataCreate(SensorDataBase):
    pass

class SensorData(SensorDataBase):
    id: int
    timestamp: datetime

    class Config:
        orm_mode = True