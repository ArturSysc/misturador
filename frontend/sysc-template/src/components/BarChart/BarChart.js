// src/components/BarChart.js
import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useTranslation } from 'react-i18next';

// Registrar todos os elementos do Chart.js
Chart.register(...registerables);

const BarChart = ({ data }) => {
  const { t } = useTranslation();
  const chartRef = useRef(null); // Referência para o canvas do gráfico

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: t('barchart.legend'),
        data: data.map(item => item.value),
        backgroundColor: '#6c7ae0',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Remover a legenda
      },
      title: {
        display: true, // Exibir título
        text: t('barchart.title'), // Texto do título
        align: 'center', // Alinhamento do título
        font: {
          size: 16, // Tamanho da fonte do título
          weight: 200,
        },
      },
    },
  };

  return (
    <div>
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
