import React from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import Scores from '../Scores/Scores'; // Importando os Scores
import AlertBox from '../AlertBox/AlertBox'; // Componente de alertas
import LineGraph from '../LineGraph/LineGraph'; // Importando o gráfico de linha
import EmergencyButton from '../EmergencyButton/EmergencyButton';
import useDashboardData from '../../hooks/useDashboardData'; // Hook para dados do dashboard
import useWindowSize from '../../hooks/useWindowSize'; // Import do hook para tamanho da tela
import useSensores from '../../hooks/useSensores'; // Import do hook para sensores
import Uptime from '../Uptime/Uptime'; // Importando o componente Uptime
import DataTable from '../DataTable/DataTable'; // Importando o componente DataTable
import './Dashboard.css';

const Dashboard = () => {
  const { data, loading: dashboardLoading } = useDashboardData();
  const windowSize = useWindowSize(); // Hook para atualizar com o redimensionamento
  const { sensores, loading: sensoresLoading, error: sensoresError } = useSensores(); // Usando o hook

  if (dashboardLoading) {
    return <div>Carregando...</div>; // Mensagem de carregamento
  }

  return (
    <Container>
      {/* Sensores */}
      <div className="sensores">
          <DataTable data={sensores} />
      </div>
      {/* <div className='emergency-button-container'>
        <EmergencyButton />
      </div> */}
      {/* Scores */}
      <div className="scores">
        {data.scores.length > 0 && <Scores scores={data.scores} />}
      </div>
      {/* Alertas */}
      <div className="alerts">
        {data.alerts.length > 0 && <AlertBox alerts={data.alerts} />}
      </div>
      {/* Gráficos */}
      <div className="charts">
        <div className="chart full">
          <LineGraph />
        </div>
      </div>
      {/* Tempo de Atividade */}
      <div className="uptime">
        <Uptime />
      </div>
    </Container>
  );
};

export default Dashboard;