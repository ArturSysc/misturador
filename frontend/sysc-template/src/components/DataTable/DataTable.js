import React from 'react';
import './DataTable.css'; // Importa o arquivo CSS para estilos personalizados

const DataTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Nenhum dado disponível.</div>; // Mensagem para caso não haja dados
  }

  // Mapeia os nomes das colunas para títulos mais descritivos
  const columnTitles = {
    temp_atual: 'Temperatura Atual (°C)',
    temp_aquece: 'Temperatura Aquecimento (°C)',
    temp_resfria: 'Temperatura Resfriamento (°C)',
    minutos_emulsa: 'Minutos Emulsão',
    minutos_homogeiniza: 'Minutos Homogeinização',
    percent_agua: 'Porcentagem Água (%)',
    percent_vapor: 'Porcentagem Vapor (%)'
  };

  // Obtém as chaves do primeiro objeto para usar como cabeçalho da tabela, excluindo o unit_id
  const headers = Object.keys(data[0]).filter(header => header !== 'unit_id');

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{columnTitles[header]}</th> // Cabeçalho da tabela com títulos descritivos
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{item[header]}</td> // Valor correspondente a cada chave
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;