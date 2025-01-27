import React from 'react';
import { Alert } from 'react-bootstrap';
import useSensores from '../../hooks/useSensores'; // Import do hook para sensores
import './Scores.css'; // Importa o arquivo CSS para estilos personalizados

const Scores = () => {
  const { sensores } = useSensores(); // Usando o hook useSensores, agora retornando o objeto e acessando a chave sensores
  console.log('Dados recebidos no Scores:', sensores); // Logando os dados para depuração

  // Verifica se sensores é um array e tem dados
  if (!Array.isArray(sensores) || sensores.length === 0) {
    return <Alert variant="warning">Não há dados disponíveis.</Alert>; // Exibe mensagem caso não haja dados
  }

  return (
    <div className="scores-container">
      {sensores.map((sensor, index) => (
        <div key={index} className="score-item">
          <div className="score-label">
            {/* Exibe o nome do sensor ou identificador */}
            Sensor {sensor.unit_id}
          </div>
          <div className="score-value">
            {/* Exibe os valores dos sensores */}
            <div>Temp Atual: {sensor.temp_atual} °C</div>
            <div>Temp Aquece: {sensor.temp_aquece} °C</div>
            <div>Temp Resfria: {sensor.temp_resfria} °C</div>
            <div>Minutos Emulsa: {sensor.minutos_emulsa} min</div>
            <div>Minutos Homogeiniza: {sensor.minutos_homogeiniza} min</div>
            <div>Percent Água: {sensor.percent_agua} %</div>
            <div>Percent Vapor: {sensor.percent_vapor} %</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Scores;