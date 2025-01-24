import logging
import os
import time
import requests
from datetime import datetime

# Configuração de logging
logging.basicConfig(
    level=logging.DEBUG, 
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

API_URL = "http://localhost:7000/sensor_data/"

def parse_modbus_packet(data):
    """Parseia pacotes Modbus TCP de dados brutos e envia para a API."""
    try:
        while data:
            if len(data) < 6:
                logger.error("Dados incompletos no cabeçalho!")
                break

            transaction_id = int.from_bytes(data[0:2], byteorder='big')
            protocol_id = int.from_bytes(data[2:4], byteorder='big')
            length = int.from_bytes(data[4:6], byteorder='big')

            logger.info("-----------------------------------------------------------------------------------")
            logger.info(f"Transaction ID: {transaction_id}")
            logger.info(f"Protocol ID: {protocol_id}")
            logger.info(f"Length: {length}")

            if len(data) < 6 + length - 1:
                logger.error("Pacote incompleto!")
                break

            unit_id = data[6]
            function_code = data[7]
            starting_address = int.from_bytes(data[8:10], byteorder='big')
            quantity = int.from_bytes(data[10:12], byteorder='big')
            byte_count = data[12] if len(data) > 12 else 0
            payload = data[13:13 + byte_count] if byte_count > 0 else b''

            logger.info(f"Unit ID: {unit_id}")
            logger.info(f"Function Code: {function_code}")
            logger.info(f"Starting Address: {starting_address}")
            logger.info(f"Quantity: {quantity}")
            logger.info(f"Byte Count: {byte_count}")
            logger.info(f"Payload (raw): {payload.hex()}")
            logger.info(f"Payload (decoded): {payload}")

            if protocol_id == 0 and unit_id == 1:
                if function_code == 16 and starting_address == 40000 and quantity == 7 and byte_count == 14:
                    logger.info("Mensagem principal recebida!")
                    values = [int.from_bytes(payload[i:i+2], byteorder='big') for i in range(0, len(payload), 2)]
                    response = requests.post(API_URL, json={"values": values})
                    if response.status_code == 200:
                        logger.info("Dados enviados com sucesso para a API!")
                    else:
                        logger.error(f"Erro ao enviar dados para a API: {response.status_code} - {response.text}")

            data = data[6 + length:]

    except Exception as e:
        logger.error(f"Erro ao parsear pacote: {str(e)}")

def simulate_modbus_data():
    """Simula o envio de dados Modbus para fins de teste."""
    # Exemplo de dados simulados
    simulated_data = b'\x00\x01\x00\x00\x00\x0f\x01\x10\x9c\x40\x00\x07\x0e\x00\x64\x00\xc8\x01\x2c\x01\x90\x01\xf4\x02\x58\x02\xbc'
    logger.info(f"Simulando dados Modbus: {simulated_data.hex()}")
    parse_modbus_packet(simulated_data)

if __name__ == "__main__":
    try:
        while True:
            simulate_modbus_data()
            time.sleep(10)  # Simula o envio a cada 10 segundos
    except KeyboardInterrupt:
        logger.info("Encerrando a simulação de dados Modbus.")
    except Exception as e:
        logger.error(f"Erro inesperado na simulação de dados Modbus: {str(e)}")