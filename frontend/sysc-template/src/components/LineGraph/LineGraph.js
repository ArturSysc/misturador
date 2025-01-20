import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Container, Row, Col, Form } from 'react-bootstrap';
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
  const [selectedSensor, setSelectedSensor] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Process data for chart
  useEffect(() => {
    if (data.length > 0 && selectedSensor) {
      const filteredData = data.filter((item) => {
        const date = new Date(item.timestamp);
        return (
          item.modbus_id === parseInt(selectedSensor) &&
          (!startDate || date >= new Date(startDate)) &&
          (!endDate || date <= new Date(endDate))
        );
      });

      const timestamps = filteredData.map(item => item.timestamp);
      const temperatures = filteredData.map(item => item.temperatura_celsius);
      const formattedTimestamps = timestamps.map(t => moment(t).format('DD/MM HH:mm'));

      setChartData({
        labels: formattedTimestamps,
        datasets: [{
          label: 'Temperatura ao longo do tempo',
          data: temperatures,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1
        }]
      });
    }
  }, [data, selectedSensor, startDate, endDate]);

  const memoizedChartData = useMemo(() => chartData, [chartData]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  const sensorOptions = [...new Set(data.map(item => item.modbus_id))];

  return (
    <Container fluid className="line-graph-container">
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Selecionar Sensor</Form.Label>
            <Form.Control
              as="select"
              value={selectedSensor}
              onChange={(e) => setSelectedSensor(e.target.value)}
            >
              <option value="">Selecione um sensor</option>
              {sensorOptions.map(sensor => (
                <option key={sensor} value={sensor}>{sensor}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Data de Início</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
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
              data={memoizedChartData} 
              options={{
                ...options,
                maintainAspectRatio: false,
                responsive: true
              }} 
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LineGraph;