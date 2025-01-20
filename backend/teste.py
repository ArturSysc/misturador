from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
from datetime import datetime

# Inicializa o aplicativo FastAPI
app = FastAPI()

# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permite requisições da origem específica
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Função para simular dados de sensores
def simulate_sensor_data(modbus_id: int):
    return {
        "modbus_id": modbus_id,
        "emergency_status": random.choice([True, False]),
        "agua": random.choice([True, False]),
        "valvula_vapor_percentage": round(random.uniform(0, 100), 2),
        "valvula_agua_percentage": round(random.uniform(0, 100), 2),
        "temperatura_celsius": round(random.uniform(20, 80), 2),
        "timestamp": datetime.now().isoformat()
    }

# Função para obter dados configurados
def get_config_data():
    timestamp = datetime.now().isoformat()
    return [
        {"modbus_id": 1, "temperatura_desejada": 42.37, "tempo_emulsao": 15, "temperatura_minima": 15.98, "temperatura_maxima": 84.16, "timestamp": timestamp},
        {"modbus_id": 2, "temperatura_desejada": 48.64, "tempo_emulsao": 10, "temperatura_minima": 14.01, "temperatura_maxima": 81.35, "timestamp": timestamp},
        {"modbus_id": 3, "temperatura_desejada": 64.84, "tempo_emulsao": 5, "temperatura_minima": 10.25, "temperatura_maxima": 96.17, "timestamp": timestamp},
    ]

# Rota para /sensores (usando GET)
@app.get("/sensores")
async def get_sensor_data():
    # Simula dados para três sensores
    sensores = [simulate_sensor_data(modbus_id) for modbus_id in range(1, 4)]
    
    # Retorna os dados simulados
    return sensores

# Rota para /config (usando GET)
@app.get("/config")
async def get_config_data_route():
    # Obtém os dados configurados
    config = get_config_data()
    
    # Retorna os dados configurados
    return config

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7000)
