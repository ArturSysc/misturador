from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine
from datetime import datetime, timedelta
import random

# Criar as tabelas no início para evitar importação circular
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuração do CORS
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    # Adicione outras origens conforme necessário
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Função para registrar o tempo de início do servidor
def register_server_start_time(db: Session):
    server_activity = models.ServerActivity(start_time=datetime.utcnow())
    db.add(server_activity)
    db.commit()
    db.refresh(server_activity)
    return server_activity.start_time

# Função para registrar o tempo de fim do servidor
def register_server_end_time(db: Session):
    server_activity = db.query(models.ServerActivity).filter(models.ServerActivity.end_time == None).first()
    if server_activity:
        server_activity.end_time = datetime.utcnow()
        db.commit()
        db.refresh(server_activity)

# Função para calcular o tempo total de atividade do servidor
def calculate_total_uptime(db: Session):
    server_activities = db.query(models.ServerActivity).all()
    total_uptime = timedelta()
    for activity in server_activities:
        if activity.end_time:
            total_uptime += activity.end_time - activity.start_time
        else:
            total_uptime += datetime.utcnow() - activity.start_time
    return total_uptime

@app.on_event("startup")
def startup_event():
    db = next(get_db())
    register_server_start_time(db)

@app.on_event("shutdown")
def shutdown_event():
    db = next(get_db())
    register_server_end_time(db)
    db.close()

@app.post("/sensor_data/", response_model=schemas.SensorData)
def create_sensor_data(sensor_data: schemas.SensorDataCreate, db: Session = Depends(get_db)):
    return crud.create_sensor_data(db=db, sensor_data=sensor_data)

@app.get("/sensor_data/", response_model=list[schemas.SensorData])
def read_sensor_data(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    sensor_data = crud.get_sensor_data(db, skip=skip, limit=limit)
    return sensor_data

@app.get("/server_time/")
def server_time():
    return {"server_time": datetime.utcnow()}

@app.get("/uptime/")
def get_uptime(db: Session = Depends(get_db)):
    total_uptime = calculate_total_uptime(db)
    return {"uptime": str(total_uptime)}

# Adicionar endpoint /sensores
@app.get("/sensores")
def get_sensores():
    # Simular dados de sensores
    sensores = [
        {
            "modbus_id": 1,
            "emergency_status": random.choice([True, False]),
            "agua": random.choice([True, False]),
            "valvula_vapor_percentage": round(random.uniform(0, 100), 2),
            "valvula_agua_percentage": round(random.uniform(0, 100), 2),
            "temperatura_celsius": round(random.uniform(20, 80), 2),
            "timestamp": datetime.now().isoformat()
        },
        {
            "modbus_id": 2,
            "emergency_status": random.choice([True, False]),
            "agua": random.choice([True, False]),
            "valvula_vapor_percentage": round(random.uniform(0, 100), 2),
            "valvula_agua_percentage": round(random.uniform(0, 100), 2),
            "temperatura_celsius": round(random.uniform(20, 80), 2),
            "timestamp": datetime.now().isoformat()
        },
        {
            "modbus_id": 3,
            "emergency_status": random.choice([True, False]),
            "agua": random.choice([True, False]),
            "valvula_vapor_percentage": round(random.uniform(0, 100), 2),
            "valvula_agua_percentage": round(random.uniform(0, 100), 2),
            "temperatura_celsius": round(random.uniform(20, 80), 2),
            "timestamp": datetime.now().isoformat()
        }
    ]
    return sensores

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7000)