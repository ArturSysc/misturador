// src/components/Dashboard.js
import React from 'react';
import { Container } from 'react-bootstrap';
import Scores from '../Scores/Scores'; // Importando os Scores
import PieChart from '../PieChart/PieChart'; // Importando gráfico de pizza
import BarChart from '../BarChart/BarChart'; // Importando gráfico de barras
import DataTable from '../DataTable/DataTable'; // Importando tabela
import AlertBox from '../AlertBox/AlertBox'; // Componente de alertas
import useDashboardData from '../../hooks/useDashboardData'; // Hook para dados do dashboard
import useWindowSize from '../../hooks/useWindowSize'; // Import do hook para tamanho da tela
import useSensores from '../../hooks/useSensores'; // Import do hook para sensores
import "./Dashboard.css"

const Dashboard = () => {
  const { data, loading } = useDashboardData();
  const windowSize = useWindowSize(); // Hook para atualizar com o redimensionamento
  const { sensores,  error } = useSensores(); // Usando o hook

  if (loading) {
    return <div>Carregando...</div>; // Mensagem de carregamento
  }

  return (
    <Container>
      {/* Scores */}
      <div className="scores">
        {data.scores.length > 0 && <Scores scores={data.scores} />}
      </div>

        {/* Gráficos */}
        <div className="charts">
          {/* <div className="chart full">
            <LineGraph />
          </div> */}
        <div className="chart">
            {/* `key` para forçar atualização com `windowSize` */}
            {data.chartData.pie.length > 0 && <PieChart key={windowSize.width} data={data.chartData.pie} />}
        </div>
        <div className="chart">
            {/* `key` para forçar atualização com `windowSize` */}
            {data.chartData.bar.length > 0 && <BarChart key={windowSize.width} data={data.chartData.bar} />}
        </div>
      </div>

      {/* Tabela */}
      {/* <div className="table">
        {data.tableData.length > 0 && <DataTable data={data.tableData} />}
      </div> */}
      
      {/* Alertas */}
      <div className="alerts">
         {data.alerts.length > 0 && <AlertBox alerts={data.alerts} />}
      </div>
    </Container>
  );
};

export default Dashboard;
