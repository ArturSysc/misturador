from sqlalchemy import Column, Integer, DateTime, Boolean, Float
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

class ServerActivity(Base):
    __tablename__ = "server_activity"

    id = Column(Integer, primary_key=True, index=True)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=True)