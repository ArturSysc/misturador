import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSensores } from './hooks/useSensores'; // Ajuste o caminho do hook

const DropdownSensores = () => {
  const sensores = useSensores(); // Supondo que retorna um array de objetos com IDs

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Selecione um Sensor
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {sensores.length > 0 ? (
          sensores.map((sensor, index) => (
            <Dropdown.Item key={index} onClick={() => console.log(sensor.id)}>
              Sensor {sensor.id}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item disabled>Nenhum sensor disponível</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownSensores;
