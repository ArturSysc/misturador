from pymodbus.client import ModbusSerialClient as ModbusClient
import logging

# Configura o logging para visualização de erros
logging.basicConfig()
log = logging.getLogger()
log.setLevel(logging.DEBUG)

class ModbusRTUClient:
    def __init__(self, port: str = '/dev/ttyUSB0', baudrate: int = 9600, slave_ids: list = [1]):
        self.client = ModbusClient(port=port, baudrate=baudrate)
        self.slave_ids = slave_ids  # Lista de IDs dos dispositivos Modbus

    def connect(self):
        """ Conecta ao dispositivo Modbus """
        if not self.client.connect():
            raise ConnectionError(f"Não foi possível conectar ao dispositivo Modbus na porta {self.client.port}")
        return self.client

    def read_sensor_data(self, slave_id: int):
        """ Lê os dados dos sensores via Modbus RTU para um dispositivo específico """
        try:
            # Leitura de exemplo dos registradores. Ajuste conforme seu dispositivo.
            result = self.client.read_input_registers(0x00, 5, unit=slave_id)
            
            if result.isError():
                raise Exception(f"Erro ao ler os dados Modbus do dispositivo {slave_id}.")
            
            # Supondo que cada valor seja um registrador de 16 bits
            data = {
                "agua": bool(result.registers[0]),
                "valvula_vapor": result.registers[1] / 100.0,  # Exemplo de valor de 0-100% para a válvula de vapor
                "valvula_agua": result.registers[2] / 100.0,  # Exemplo de valor de 0-100% para a válvula de água
                "temperatura": result.registers[3] / 10.0,  # Exemplo de temperatura em °C (divisão por 10)
                "emergencia": bool(result.registers[4])  # Aleatório para 'emergency'
            }
            return data
        except Exception as e:
            log.error(f"Erro ao ler dados Modbus para slave_id {slave_id}: {e}")
            return None

    def read_sensor_config(self, slave_id: int):
        """ Lê as configurações dos sensores via Modbus RTU para um dispositivo específico """
        try:
            result = self.client.read_input_registers(0x04, 4, unit=slave_id)  # Ajuste do endereço para ler configurações
            if result.isError():
                raise Exception(f"Erro ao ler as configurações do sensor do dispositivo {slave_id}.")
            
            config = {
                "temperatura_desejada": result.registers[0] / 10.0,  # Ajuste conforme sua configuração
                "tempo_emulsao": result.registers[1],
                "temperatura_minima": result.registers[2] / 10.0,
                "temperatura_maxima": result.registers[3] / 10.0
            }
            return config
        except Exception as e:
            log.error(f"Erro ao ler configurações do Modbus para slave_id {slave_id}: {e}")
            return None

    def close(self):
        """ Fecha a conexão Modbus """
        self.client.close()

# Exemplo de uso:
if __name__ == "__main__":
    modbus_client = ModbusRTUClient(port='/dev/ttyUSB0', baudrate=9600, slave_ids=[1])
    try:
        modbus_client.connect()
        for slave_id in modbus_client.slave_ids:
            data = modbus_client.read_sensor_data(slave_id)
            config = modbus_client.read_sensor_config(slave_id)
            print(f"Dados do sensor para o dispositivo {slave_id}: {data}")
            print(f"Configurações do sensor para o dispositivo {slave_id}: {config}")
    finally:
        modbus_client.close()
