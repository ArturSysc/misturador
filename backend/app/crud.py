from sqlalchemy.orm import Session
from . import models, schemas

def create_sensor_data(db: Session, sensor_data: schemas.SensorDataCreate):
    db_sensor_data = models.SensorData(**sensor_data.dict())
    db.add(db_sensor_data)
    db.commit()
    db.refresh(db_sensor_data)
    return db_sensor_data

def get_sensor_data(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.SensorData).offset(skip).limit(limit).all()