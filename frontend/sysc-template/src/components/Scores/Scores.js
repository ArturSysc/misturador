// src/components/Scores.js
import React from 'react';
import './Scores.css';
import useSensores from '../../hooks/useSensores'; // Import do hook para sensores

const Scores = () => {
  const { sensores } = useSensores(); // Usando o hook useSensores, agora retornando o objeto e acessando a chave sensores
  console.log('Dados recebidos no Scores:', sensores); // Logando os dados para depuração

  // Verifica se sensores é um array e tem dados
  if (!Array.isArray(sensores) || sensores.length === 0) {
    return <div>Não há dados disponíveis.</div>; // Exibe mensagem caso não haja dados
  }

  return (
    <div className="scores-container">
      {sensores.map((sensor, index) => (
        <div key={index} className="score-item">
          <div className="score-label">
            {/* Exibe o nome do sensor ou identificador */}
            Sensor {sensor.modbus_id}
          </div>
          <div className="score-value">
            {/* Exibe o valor da temperatura */}
            Temperatura: {sensor.temperatura_celsius} °C
          </div>
          <div className="score-status">
            {/* Exibe o status do sensor Água */}
            {sensor.agua ? (
              <span className="ok-status">Água OK</span>
            ) : (
              <span className="error-status">Água NÃO OK</span>
            )}
            {/* Exibe as válvulas de vapor e água */}
            <div>
              Válvula de Vapor: {sensor.valvula_vapor_percentage}%
            </div>
            <div>
              Válvula de Água: {sensor.valvula_agua_percentage}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Scores;
