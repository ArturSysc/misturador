import React from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import useUptime from '../../hooks/useUptime';
import './Uptime.css';

const Uptime = () => {
  const { uptime, loading, error } = useUptime();

  if (loading) {
    return (
      <Card className="uptime-container">
        <Card.Body>
          <Spinner animation="border" role="status">
            <span className="sr-only">Carregando...</span>
          </Spinner>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="uptime-container">
        <Card.Body>
          <Alert variant="danger">{error}</Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="uptime-container">
      <Card.Body>
        <Card.Title className="uptime-title">Tempo de Atividade do Servidor</Card.Title>
        <Card.Text className="uptime-value">{uptime}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Uptime;