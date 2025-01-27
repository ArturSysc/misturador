from pymodbus.client import ModbusTcpClient
import logging
import os
import time

# Configuração de logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Configuração do cliente Modbus
MODBUS_HOST = "192.168.0.254"  # IP do CLP
MODBUS_PORT = 8899  # Porta do CLP
client = ModbusTcpClient(host=MODBUS_HOST, port=MODBUS_PORT, timeout=3)

def connect_to_modbus():
    """Tenta conectar ao CLP via Modbus."""
    if client.connect():
        logger.info("✅ Conectado ao CLP com sucesso!")
        return True
    else:
        logger.error("❌ Falha ao conectar ao CLP.")
        return False

def send_custom_packet(packet_hex):
    """Envia um pacote Modbus personalizado para o CLP."""
    if not client.is_socket_open():
        logger.warning("⚠️ Conexão perdida. Tentando reconectar...")
        if not connect_to_modbus():
            return

    try:
        # Pacote hexadecimal a ser enviado
        packet = bytes.fromhex(packet_hex)

        # Enviar o pacote personalizado
        logger.info(f"Enviando pacote personalizado: {packet.hex()}")
        client.socket.send(packet)

        # Ler a resposta
        response = client.socket.recv(1024)
        logger.info(f"Resposta recebida: {response.hex()}")

    except Exception as e:
        logger.error(f"❌ Erro ao enviar pacote: {str(e)}")

if __name__ == "__main__":
    if connect_to_modbus():
        # while True:
            send_custom_packet("000000000008010F000800020100")
            time.sleep(5)  # Esperar 5 segundos antes de enviar o próximo pacote
            send_custom_packet("00000000000B2A030800BA00BB00BC00BD")
            time.sleep(5)  # Repetir a cada 5 segundos (ajuste conforme necessário)