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
class ProcessStatus(BaseModel):
    inicio: bool
    fim: bool

class ProcessData(BaseModel):
    homogeneizacao: ProcessStatus
    resfriamento: ProcessStatus
    emulsao: ProcessStatus
    aquecimento: ProcessStatus
    timestamp: datetime
    class Config:
        orm_mode = True