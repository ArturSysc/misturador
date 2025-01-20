import requests
from pymodbus.client.sync import ModbusSerialClient as ModbusClient

# Configuração do cliente Modbus
client = ModbusClient(method='rtu', port='/dev/ttyUSB0', baudrate=9600, timeout=1)
client.connect()

# Função para ler dados do Modbus e enviar para a API
def read_and_send_data():
    result = client.read_holding_registers(0, 5, unit=1)
    data = {
        "emergency_status": bool(result.registers[0]),
        "agua": bool(result.registers[1]),
        "valvula_vapor_percentage": result.registers[2] / 100.0,
        "valvula_agua_percentage": result.registers[3] / 100.0,
        "temperatura_celsius": result.registers[4] / 10.0
    }

    # Enviar dados para a API
    response = requests.post("http://localhost:7000/sensor_data/", json=data)
    print(response.json())

# Chamar a função para ler e enviar dados
read_and_send_data()

client.close()