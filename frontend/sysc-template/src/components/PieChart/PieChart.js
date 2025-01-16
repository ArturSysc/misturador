// src/components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Registrar todos os elementos do Chart.js
Chart.register(...registerables);

const PieChart = ({ data }) => {
    const chartData = {
      labels: data.map(item => item.label),
      datasets: [
        {
          data: data.map(item => item.value),
          backgroundColor: ['#3d4594', '#ae832d', '#020252'],
        },
      ],
    };
  
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
                  color: '#333' // Cor da fonte da legenda
              }
          }
      }
  };

  return (
      <div>
          <Pie data={chartData} options={options} />
      </div>
  );
};
  
  export default PieChart;