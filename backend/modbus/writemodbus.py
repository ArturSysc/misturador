import logging
from pymodbus.client import ModbusTcpClient
from pymodbus.exceptions import ModbusIOException, ConnectionException
import time

logging.basicConfig(
    level=logging.DEBUG, 
    format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

client = ModbusTcpClient(host="192.168.0.254", port=8899, timeout=3)

def connect_to_modbus():
    """Conecta ao servidor Modbus."""
    if client.connect():
        logger.info("Conectado com sucesso!")
        return True
    else:
        logger.error("Falha na conexão!")
        return False

def write_holding_registers(address, values):
    """Escreve dados nos registradores de retenção (holding registers)."""
    if not client.is_socket_open():
        logger.warning("Não conectado, tentando conectar!")
        if not connect_to_modbus():
            time.sleep(5)
            return None

    logger.info("Conexão Modbus ativa")
    logger.debug(f"Escrevendo registros - Endereço: {hex(address)}, Valores: {values}")
    result = client.write_registers(address, values)

    if result.isError():
        logger.error(f"Erro na escrita: {result}")
        return None
    else:
        logger.info(f"Escrita bem-sucedida: {result}")
        return result