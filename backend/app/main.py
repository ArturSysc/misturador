from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from . import schemas
from datetime import datetime
import random
import logging

# Configuração de logging
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

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

sensor_data_list = []
MAX_ITEMS = 1  # Limite de 1 registro

# Endpoint para receber dados Modbus diretamente
@app.post("/sensor_data/", response_model=schemas.SensorData)
def receive_sensor_data(sensor_data: schemas.SensorDataCreate):
    try:
        unit_id = sensor_data.unit_id
        values = sensor_data.values
        if len(sensor_data_list) >= MAX_ITEMS:
            sensor_data_list.pop(0)  # Remove o item mais antigo
        sensor_data_list.append({"unit_id": unit_id, "values": values})
        logger.info(f"Dados recebidos: {values} do Unit ID: {unit_id}")
        return schemas.SensorData(
            id=len(sensor_data_list),
            unit_id=unit_id,
            temp_atual=sensor_data.temp_atual,
            temp_aquece=sensor_data.temp_aquece,
            temp_resfria=sensor_data.temp_resfria,
            minutos_emulsa=sensor_data.minutos_emulsa,
            minutos_homogeiniza=sensor_data.minutos_homogeiniza,
            percent_agua=sensor_data.percent_agua,
            percent_vapor=sensor_data.percent_vapor,
            values=values,
            timestamp=datetime.utcnow()
        )
    except Exception as e:
        logger.error(f"Erro ao processar dados: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao processar dados.")

# Endpoint para listar dados de sensores (sem banco de dados)
@app.get("/sensor_data/", response_model=list[schemas.SensorData])
def read_sensor_data(skip: int = 0, limit: int = 10):
    return [
        schemas.SensorData(
            id=i + 1,
            unit_id=data["unit_id"],
            temp_atual=data["values"][0],
            temp_aquece=data["values"][1],
            temp_resfria=data["values"][2],
            minutos_emulsa=data["values"][3],
            minutos_homogeiniza=data["values"][4],
            percent_agua=data["values"][5],
            percent_vapor=data["values"][6],
            values=data["values"],
            timestamp=datetime.utcnow()
        )
        for i, data in enumerate(sensor_data_list[skip:skip + limit])
    ]

# Endpoint para receber dados de processo
@app.post("/process_data/", response_model=schemas.ProcessData)
def receive_process_data(process_data: schemas.ProcessData):
    try:
        logger.info(f"Process Data received: {process_data}")
        return process_data
    except Exception as e:
        logger.error(f"Erro ao processar dados de processo: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao processar dados de processo.")

# Endpoint para retornar o tempo do servidor
@app.get("/server_time/")
def server_time():
    return {"server_time": datetime.utcnow()}

# Endpoint para cálculo de uptime com banco de dados
@app.get("/uptime/")
def get_uptime():
    # Simulação de tempo de atividade
    total_uptime = "Simulated uptime"
    return {"uptime": total_uptime}

# Endpoint para simular sensores (mantido)
@app.get("/sensores/")
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