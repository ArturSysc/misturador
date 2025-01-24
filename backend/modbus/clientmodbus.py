import logging
from pymodbus.client import ModbusTcpClient
from pymodbus.exceptions import ModbusIOException, ConnectionException
import time
import os
import requests

API_URL = "http://localhost:7000/sensor_data/"

# Configuração de logging
logging.basicConfig(
    level=logging.DEBUG, 
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Configuração do cliente Modbus
MODBUS_HOST = os.getenv('MODBUS_HOST', '192.168.0.254')
MODBUS_PORT = int(os.getenv('MODBUS_PORT', 8899))
client = ModbusTcpClient(host=MODBUS_HOST, port=MODBUS_PORT, timeout=3)

def connect_to_modbus():
    """Tenta conectar ao servidor Modbus e retorna True se for bem-sucedido."""
    while True:
        try:
            logger.debug(f"Tentando conectar ao servidor Modbus em {MODBUS_HOST}:{MODBUS_PORT}")
            if client.connect():
                logger.info("Conectado com sucesso ao servidor Modbus!")
                return True
            else:
                logger.error("Falha na conexão. Tentando novamente em 5 segundos...")
        except Exception as e:
            logger.error(f"Erro ao tentar conectar: {str(e)}")

        time.sleep(5)  # Aguarda antes de tentar novamente

def parse_modbus_packet(data):
    """Parseia pacotes Modbus TCP de dados brutos."""
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

            if protocol_id == 0 and length >= 21:
                if function_code == 16 and starting_address == 40000 and quantity == 7 and byte_count == 14:
                    logger.info("Mensagem principal recebida!")
                    values = []
                    for i in range(0, len(payload), 2):
                        if i + 2 <= len(payload):
                            value = int.from_bytes(payload[i:i+2], byteorder='big')
                            values.append(value)
                            logger.info(f"Valor {i//2 + 1}: {value}")
                    # Enviar os valores e o unit_id para a API após processar todos os valores
                    response = requests.post(API_URL, json={"unit_id": unit_id, "values": values})
                    if response.status_code == 200:
                        logger.info("Dados enviados com sucesso para a API!")
                    else:
                        logger.error(f"Erro ao enviar dados para a API: {response.status_code} - {response.text}")
                elif function_code == 15 and starting_address == 0 and quantity == 8 and byte_count == 1:
                    logger.info("Mensagem secundária 1 recebida!")
                    for i in range(len(payload)):
                        value = payload[i]
                        logger.info(f"Valor {i + 1}: {value}")
                elif function_code == 15 and starting_address == 8 and quantity == 2 and byte_count == 1:
                    logger.info("Mensagem secundária 2 recebida!")
                    for i in range(len(payload)):
                        value = payload[i]
                        logger.info(f"Valor {i + 1}: {value}")

            data = data[6 + length:]

    except Exception as e:
        logger.error(f"Erro ao parsear pacote: {str(e)}")

def listen_to_data():
    """Escuta dados recebidos no socket Modbus e tenta reconectar se a conexão for perdida."""
    while True:
        try:
            if not client.is_socket_open():
                logger.warning("Conexão perdida. Tentando reconectar...")
                if not connect_to_modbus():
                    continue  # Volta para o loop e tenta reconectar

            data = client.socket.recv(1024)
            if data:
                logger.info(f"Dados recebidos (hex): {data.hex()}")
                parse_modbus_packet(data)
            else:
                logger.debug("Nenhum dado recebido no intervalo atual.")
        except Exception as e:
            logger.error(f"Erro ao escutar dados: {str(e)}")
            time.sleep(5)  # Aguarda antes de tentar novamente

if __name__ == "__main__":
    if connect_to_modbus():
        listen_to_data()