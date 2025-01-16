// src/components/LineGraph/LineGraph.js
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import useGraph from '../../hooks/useGraph';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';  // Importando o useTranslations
import moment from 'moment';  // Importando Moment.js

// Registrando as escalas e elementos do gráfico
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineGraph = () => {
  const { data, loading, error } = useGraph();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { t } = useTranslation();  // Usando o useTranslations para obter as traduções


  // Função para formatar os timestamps usando moment.js
  const formatTimestamps = (timestamps) => {
    return timestamps.map((timestamp) => moment(timestamp).format('DD/MM HH:mm'));
  };

  if (loading) {
    return <div>{t('lineGraph.loading')}</div>;
  }

  if (error) {
    return <div>{t('lineGraph.error')}: {error}</div>;
  }

  // Obtém as datas mínima e máxima com base nos dados fornecidos
  const minDate = data.timestamps[0];
  const maxDate = data.timestamps[data.timestamps.length - 1];

  // Filtrando os dados com base nas datas selecionadas
  const filteredData = {
    timestamps: [],
    values: [],
  };

  data.timestamps.forEach((timestamp, index) => {
    const date = new Date(timestamp);
    if ((!startDate || date >= new Date(startDate)) && (!endDate || date <= new Date(endDate))) {
      filteredData.timestamps.push(timestamp);
      filteredData.values.push(data.values[index]);
    }
  });

  // Formatando os timestamps antes de passar para o gráfico
  const formattedTimestamps = formatTimestamps(filteredData.timestamps);

  const chartData = {
    labels: formattedTimestamps,  // Usando os timestamps formatados
    datasets: [
      {
        label: t('lineGraph.title'),
        data: filteredData.values,
        fill: false,
        backgroundColor: 'rgba(245, 138, 61, 1)',
        borderColor: 'rgba(249, 210, 157, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 9 / 3,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const exportToPDF = async () => {
    const formattedStartDate = new Date(startDate).toLocaleDateString('en-GB'); // Formato DD/MM/YYYY
    const formattedEndDate = new Date(endDate).toLocaleDateString('en-GB'); // Formato DD/MM/YYYY
    const canvas = await html2canvas(document.querySelector("#chart"));
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 90);
    pdf.save(`DATA-${formattedStartDate}-${formattedEndDate}.pdf`);
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col md={4}>
          <Form.Group controlId="startDate">
            <Form.Label>{t('lineGraph.startDateLabel')}</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={minDate}
              max={maxDate}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="endDate">
            <Form.Label>{t('lineGraph.endDateLabel')}</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || minDate}
              max={maxDate}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="text-end">
            <Button variant="light" onClick={exportToPDF}>
              {t('lineGraph.savePdfButton')}
            </Button>
          </Form.Group>
        </Col>
      </Row>

      <div id="chart" className="border p-3" style={{ height: '60vh', width: '100%' }}>
        <Line data={chartData} options={options} />
      </div>
    </Container>
  );
};

export default LineGraph;