import requests
from pymodbus.client import ModbusTcpClient
from pymodbus.exceptions import ModbusIOException
import time

# Configuração do cliente Modbus para conectar ao servidor
client = ModbusTcpClient('192.168.0.254', port=8899)

# Função para tentar conectar ao servidor Modbus
def connect_to_modbus():
    while not client.is_socket_open():
        print("Not connected, trying to connect!")
        client.connect()
        time.sleep(1)  # Esperar 1 segundo antes de tentar novamente

# Função para ler dados do Modbus e enviar para a API
def read_and_send_data():
    connect_to_modbus()
    while True:
        if client.is_socket_open():
            print("Conexão com o servidor Modbus está aberta.")
            # Ler 3 registros de retenção começando do endereço 0
            try:
                result = client.read_holding_registers(0, count=3)
                if not result.isError():
                    # Imprimir todos os dados recebidos
                    print("Dados recebidos do Modbus:", result.registers)
                    
                    data = {
                        "temperatura_celsius": result.registers[0] / 10.0,
                        "valvula_agua_percentage": result.registers[1],
                        "valvula_vapor_percentage": result.registers[2]
                    }

                    # Enviar dados para a API
                    response = requests.post("http://localhost:7000/sensor_data/", json=data)
                    print("Resposta da API:", response.json())
                else:
                    print("Erro ao ler registros:", result)
            except ModbusIOException as e:
                print(f"Erro de comunicação Modbus: {e}")
            except Exception as e:
                print(f"Erro ao tentar ler registros: {e}")
        else:
            print("Conexão com o servidor Modbus não está aberta.")
        
        time.sleep(5)  # Esperar 5 segundos antes de ler novamente

# Nova função para ler e imprimir valores dos registros Modbus
def read_and_print_data():
    connect_to_modbus()
    while True:
        if client.is_socket_open():
            print("Conexão com o servidor Modbus está aberta.")
            # Ler 3 registros de retenção começando do endereço 0
            try:
                result = client.read_holding_registers(0, count=3, unit=1)
                if not result.isError():
                    # Imprimir todos os dados recebidos como inteiros
                    print("Dados recebidos do Modbus (int):", result.registers)
                    
                    # Opcional: Imprimir os dados em hexadecimal
                    hex_values = [hex(value) for value in result.registers]
                    print("Dados recebidos do Modbus (hex):", hex_values)
                else:
                    print("Erro ao ler registros:", result)
            except ModbusIOException as e:
                print(f"Erro de comunicação Modbus: {e}")
            except Exception as e:
                print(f"Erro ao tentar ler registros: {e}")
        else:
            print("Conexão com o servidor Modbus não está aberta.")
        
        time.sleep(5)  # Esperar 5 segundos antes de ler novamente


# Chamar a função para ler e enviar dados
# read_and_send_data()

read_and_print_data()

# Fechar a conexão do cliente Modbus (nunca será alcançado devido ao loop infinito)
client.close()