from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from . import models, schemas

def create_sensor_data(db: Session, sensor_data: schemas.SensorDataCreate):
    db_sensor_data = models.SensorData(**sensor_data.dict())
    db.add(db_sensor_data)
    db.commit()
    db.refresh(db_sensor_data)
    return db_sensor_data

def get_sensor_data(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.SensorData).offset(skip).limit(limit).all()

def register_server_start_time(db: Session):
    # Verificar atividades sem end_time e registrar o end_time
    unfinished_activities = db.query(models.ServerActivity).filter(models.ServerActivity.end_time == None).all()
    for activity in unfinished_activities:
        activity.end_time = datetime.utcnow()
        db.commit()
        db.refresh(activity)
        print(f"Unfinished activity end time registered: {activity.end_time}")
    
    # Registrar nova atividade de início
    server_activity = models.ServerActivity(start_time=datetime.utcnow())
    db.add(server_activity)
    db.commit()
    db.refresh(server_activity)
    return server_activity.start_time

def register_server_end_time(db: Session):
    server_activity = db.query(models.ServerActivity).filter(models.ServerActivity.end_time == None).first()
    if server_activity:
        server_activity.end_time = datetime.utcnow()
        db.commit()
        db.refresh(server_activity)
        print(f"Server end time registered: {server_activity.end_time}")
    else:
        print("No active server activity found to end.")

def calculate_total_uptime(db: Session):
    server_activities = db.query(models.ServerActivity).all()
    total_uptime = timedelta()
    for activity in server_activities:
        print(f"Start Time: {activity.start_time}, End Time: {activity.end_time}")
        if activity.end_time:
            total_uptime += activity.end_time - activity.start_time
        else:
            total_uptime += datetime.utcnow() - activity.start_time
    print(f"Total Uptime (timedelta): {total_uptime}")
    # Formatar o tempo total de atividade sem os segundos
    total_seconds = int(total_uptime.total_seconds())
    hours, remainder = divmod(total_seconds, 3600)
    minutes, _ = divmod(remainder, 60)
    formatted_uptime = f"{hours}h {minutes}m"
    print(f"Formatted Uptime: {formatted_uptime}")
    return formatted_uptime