from pydantic import BaseModel
from datetime import datetime
from typing import List

class SensorDataBase(BaseModel):
    unit_id: int
    temp_atual: int
    temp_aquece: int
    temp_resfria: int
    minutos_emulsa: int
    minutos_homogeiniza: int
    percent_agua: int
    percent_vapor: int

class SensorDataCreate(SensorDataBase):
    values: List[int]  # Adicionar o campo values

class SensorData(SensorDataBase):
    id: int
    timestamp: datetime

    class Config:
        orm_mode = True

class ProcessData(BaseModel):
    ht: int
    ho: int
    ct: int
    ci: int
    et: int
    ei: int
    at: int
    ai: int
    timestamp: datetime

    class Config:
        orm_mode = True