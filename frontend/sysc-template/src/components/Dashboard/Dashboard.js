import React from 'react';
import { Container } from 'react-bootstrap';
import Scores from '../Scores/Scores'; // Importando os Scores
import DataTable from '../DataTable/DataTable'; // Importando tabela
import AlertBox from '../AlertBox/AlertBox'; // Componente de alertas
import LineGraph from '../LineGraph/LineGraph'; // Importando o gráfico de linha
import EmergencyButton from '../EmergencyButton/EmergencyButton';
import useDashboardData from '../../hooks/useDashboardData'; // Hook para dados do dashboard
import useWindowSize from '../../hooks/useWindowSize'; // Import do hook para tamanho da tela
import useSensores from '../../hooks/useSensores'; // Import do hook para sensores
import './Dashboard.css';

const Dashboard = () => {
  const { data, loading } = useDashboardData();
  const windowSize = useWindowSize(); // Hook para atualizar com o redimensionamento
  const { sensores, error } = useSensores(); // Usando o hook

  if (loading) {
    return <div>Carregando...</div>; // Mensagem de carregamento
  }

  return (
    <Container>
      <div>
        <EmergencyButton />
      </div>
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
    </Container>
  );
};

export default Dashboard;