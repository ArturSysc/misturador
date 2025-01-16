// src/components/DataTable.js
import React from 'react';
import './DataTable.css'; // Importa o arquivo CSS para estilos personalizados

const DataTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>Nenhum dado disponível.</div>; // Mensagem para caso não haja dados
  }

  // Obtém as chaves do primeiro objeto para usar como cabeçalho da tabela
  const headers = Object.keys(data[0]);

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th> // Cabeçalho da tabela
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
