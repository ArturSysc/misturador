// src/components/PieChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Registrar todos os elementos do Chart.js
Chart.register(...registerables);

const PieChart = () => {
  const [dataFromApi, setDataFromApi] = useState([]);

  useEffect(() => {
    // Buscar os dados da API (ajuste a URL conforme necessário)
    fetch('http://localhost:7000/sensores')  // Atualize com a URL da sua API
      .then(response => response.json())
      .then(data => {
        setDataFromApi(data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados da API:", error);
      });
  }, []);

  // Mapeando os dados para o formato esperado pelo gráfico
  const chartData = {
    labels: ['Válvula de Vapor', 'Válvula de Água'], // Labels que você vai exibir na legenda
    datasets: dataFromApi.length > 0 ? [
      {
        data: [
          dataFromApi.reduce((acc, curr) => acc + curr.valvula_vapor_percentage, 0), // Soma dos percentuais de válvula de vapor
          dataFromApi.reduce((acc, curr) => acc + curr.valvula_agua_percentage, 0), // Soma dos percentuais de válvula de água
        ],
        backgroundColor: ['#3d4594', '#ae832d'], // Cores para as fatias do gráfico
      },
    ] : [],
  };

  // Configurações do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'left', // Posiciona a legenda à esquerda
        align: 'start',   // Alinha os itens da legenda à esquerda
        labels: {
          font: {
            size: 14, // Tamanho da fonte da legenda
            weight: 300,
          },
          color: '#333', // Cor da fonte da legenda
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {/* Exibe o gráfico somente se houver dados */}
      {dataFromApi.length > 0 ? (
        <Pie data={chartData} options={options} />
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default PieChart;
