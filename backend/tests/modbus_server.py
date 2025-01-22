import asyncio
from pymodbus.server.async_io import StartAsyncTcpServer
from pymodbus.datastore import ModbusSlaveContext, ModbusServerContext
from pymodbus.device import ModbusDeviceIdentification
from pymodbus.datastore import ModbusSequentialDataBlock

# Configuração do contexto do servidor Modbus
store = ModbusSlaveContext(
    di=ModbusSequentialDataBlock(0, [0]*100),
    co=ModbusSequentialDataBlock(0, [0]*100),
    hr=ModbusSequentialDataBlock(0, [0]*100),
    ir=ModbusSequentialDataBlock(0, [0]*100))
context = ModbusServerContext(slaves=store, single=True)

# Identificação do dispositivo Modbus
identity = ModbusDeviceIdentification()
identity.VendorName = 'pymodbus'
identity.ProductCode = 'PM'
identity.VendorUrl = 'http://github.com/riptideio/pymodbus/'
identity.ProductName = 'pymodbus Server'
identity.ModelName = 'pymodbus Server'
identity.MajorMinorRevision = '1.0'

# Função para alterar os valores no servidor Modbus
async def update_values():
    while True:
        # Atualizar valores de temperatura, válvula de água e válvula de vapor
        temperatura = 0xFA  # Exemplo: 250 em hexadecimal (25.0 graus Celsius)
        valvula_agua = 0x32  # Exemplo: 50 em hexadecimal (50% de abertura)
        valvula_vapor = 0x4B  # Exemplo: 75 em hexadecimal (75% de abertura)

        # Converter valores hexadecimais para inteiros e armazenar nos registros
        store.setValues(3, 0, [temperatura, valvula_agua, valvula_vapor])
        print(f"Valores atualizados no servidor Modbus: Temperatura={hex(temperatura)}, Valvula Agua={hex(valvula_agua)}, Valvula Vapor={hex(valvula_vapor)}")
        await asyncio.sleep(5)

# Função principal para iniciar o servidor e atualizar os valores
async def main():
    print("Iniciando o servidor Modbus...")
    # Iniciar o servidor Modbus TCP
    server_task = asyncio.create_task(StartAsyncTcpServer(context, identity=identity, address=("localhost", 5020)))
    # Atualizar os valores periodicamente
    update_task = asyncio.create_task(update_values())
    await asyncio.gather(server_task, update_task)

if __name__ == "__main__":
    asyncio.run(main())