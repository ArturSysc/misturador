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

# Rota para /sensores (usando GET)
@app.get("/sensores")
async def get_sensor_data():
    # Simula dados para três sensores
    sensores = [simulate_sensor_data(modbus_id) for modbus_id in range(1, 4)]
    
    # Retorna os dados simulados
    return sensores

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7000)
