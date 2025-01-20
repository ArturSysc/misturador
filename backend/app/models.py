from sqlalchemy import Column, Integer, Float, Boolean, DateTime
from .database import Base
from datetime import datetime

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    emergency_status = Column(Boolean)
    agua = Column(Boolean)
    valvula_vapor_percentage = Column(Float)
    valvula_agua_percentage = Column(Float)
    temperatura_celsius = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)