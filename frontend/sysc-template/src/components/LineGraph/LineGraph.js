import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import useGraph from '../../hooks/useGraph';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import jsPDF from 'jspdf';
import './LineGraph.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = ({ options }) => {
  const { data, loading, error } = useGraph();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Função para processar dados e atualizar o gráfico
  const updateChartData = () => {
    if (data.length > 0) {
      console.log("Dados recebidos:", data); // Log dos dados recebidos

      const filteredData = data.filter((item) => {
        const date = new Date(item.timestamp);
        return (
          (!startDate || date >= new Date(startDate)) &&
          (!endDate || date <= new Date(endDate))
        );
      });

      console.log("Dados filtrados:", filteredData); // Log dos dados filtrados

      const timestamps = filteredData.map(item => item.timestamp);
      const temperatures = filteredData.map(item => item.temp_atual);
      const formattedTimestamps = timestamps.map(t => moment(t).format('DD/MM HH:mm'));

      const newChartData = {
        labels: formattedTimestamps,
        datasets: [{
          label: 'Temperatura ao longo do tempo',
          data: temperatures,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1
        }]
      };

      setChartData(newChartData);

      console.log("Dados para gráfico:", newChartData); // Exibe os dados que estão sendo passados para o gráfico
    }
  };

  // Atualizar gráfico sempre que os dados ou filtros mudarem
  useEffect(() => {
    console.log("Dados ou filtros mudaram, atualizando gráfico...");
    updateChartData();

    const interval = setInterval(() => {
      console.log("Atualizando gráfico a cada 30 segundos...");
      updateChartData();
    }, 30000); // 30 segundos

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [data, startDate, endDate]); // Atualizar se `data`, `startDate` ou `endDate` mudarem

  const exportPDF = () => {
    console.log("Exportando para PDF...");
    const doc = new jsPDF();
    let y = 10; // Posição vertical inicial
    const lineHeight = 10; // Altura de cada linha
    const pageHeight = doc.internal.pageSize.height; // Altura da página

    // Adicionar título
    doc.text('Dados dos Sensores', 10, y);
    y += lineHeight; // Incrementar a posição vertical

    // Usar o chartData para garantir que os dados são consistentes
    const { labels, datasets } = chartData;
    if (datasets.length > 0) {
      const dataPoints = datasets[0].data;

      labels.forEach((label, index) => {
        if (y + lineHeight * 8 > pageHeight) { // Verificar se há espaço suficiente na página
          doc.addPage();
          y = 10; // Reiniciar a posição vertical na nova página
        }

        doc.text(`Data: ${label}`, 10, y);
        y += lineHeight;
        doc.text(`Temperatura: ${dataPoints[index]} °C`, 10, y);
        y += lineHeight * 2; // Adicionar um espaçamento extra entre registros
      });
    }

    // Salvar o PDF
    doc.save('dados_sensores.pdf');
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <Alert variant="danger">Erro: {error}</Alert>;

  return (
    <Container fluid className="line-graph-container">
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Data de Início</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Data de Fim</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="chart-container">
            <Line
              data={chartData}
              options={{
                ...options,
                maintainAspectRatio: false,
                responsive: true
              }}
            />
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button onClick={exportPDF}>Exportar para PDF</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LineGraph;