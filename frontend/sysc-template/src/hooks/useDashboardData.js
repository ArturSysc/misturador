import { useState, useEffect } from 'react';

/**
 * Função para buscar os dados da API de configuração.
 * @returns {Promise} Retorna uma Promise com os dados da API `/config`.
 */
const fetchConfigData = async () => {
  try {
    const response = await fetch('http://localhost:73000/config');
    if (!response.ok) throw new Error('Erro ao buscar dados de configuração.');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados da API /config:', error);
    return [];
  }
};

/**
 * Função para buscar os dados da API de sensores.
 * @returns {Promise} Retorna uma Promise com os dados da API `/sensores`.
 */
const fetchSensorData = async () => {
  try {
    const response = await fetch('http://localhost:7000/sensores');
    if (!response.ok) throw new Error('Erro ao buscar dados dos sensores.');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados da API /sensores:', error);
    return [];
  }
};

/**
 * Função para processar os dados de scores combinando dados das duas APIs.
 * @param {Array} configData Dados da API `/config`.
 * @param {Array} sensorData Dados da API `/sensores`.
 * @returns {Array} Dados formatados para scores.
 */
const processScores = (configData, sensorData) => {
  return sensorData.map((sensor) => {
    const config = configData.find((cfg) => cfg.modbus_id === sensor.modbus_id) || {};
    return {
      label: `Sensor ${sensor.modbus_id}`,
      status: sensor.agua ? 'Online' : 'Offline',
      temperatura: {
        value: sensor.temperatura_celsius,
        unit: '°C',
        min: config.temperatura_minima || '',
        max: config.temperatura_maxima || '',
        ok: config.temperatura_desejada || '',
      },
      valvula_vapor: {
        value: sensor.valvula_vapor_percentage,
        unit: '%',
      },
      valvula_agua: {
        value: sensor.valvula_agua_percentage,
        unit: '%',
      },
      tempo_emulsao: config.tempo_emulsao || '',
    };
  });
};

/**
 * Função para processar os dados da tabela.
 * @param {Array} configData Dados da API `/config`.
 * @returns {Array} Dados formatados para tabela.
 */
const processTableData = (configData) => {
  return configData.map((config) => ({
    id: config.modbus_id,
    temperatura_desejada: config.temperatura_desejada,
    temperatura_minima: config.temperatura_minima,
    temperatura_maxima: config.temperatura_maxima,
    tempo_emulsao: config.tempo_emulsao,
    timestamp: config.timestamp,
  }));
};

/**
 * Função para processar os dados de alertas com base nos sensores.
 * @param {Array} sensorData Dados da API `/sensores`.
 * @returns {Array} Dados formatados para alertas.
 */
const processAlerts = (sensorData) => {
  return sensorData
    .filter((sensor) => sensor.valvula_vapor_percentage > 90 || sensor.valvula_agua_percentage > 90)
    .map((sensor) => ({
      timestamp: sensor.timestamp,
      type: 'alerta',
      message: `Alerta no Sensor ${sensor.modbus_id}: Verifique as válvulas.`,
    }));
};

/**
 * Hook para gerenciar os dados do dashboard combinando duas APIs.
 * @returns {Object} Objeto contendo `data` (dados do dashboard) e `loading` (estado de carregamento).
 */
const useDashboardData = () => {
  const [data, setData] = useState({ scores: [], tableData: [], alerts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Busca os dados das duas APIs
        const [configData, sensorData] = await Promise.all([fetchConfigData(), fetchSensorData()]);

        // Processa os dados para cada seção do dashboard
        const scores = processScores(configData, sensorData);
        const tableData = processTableData(configData);
        const alerts = processAlerts(sensorData);

        // Atualiza o estado com os dados recebidos
        setData({ scores, tableData, alerts });
      } catch (error) {
        console.error('Erro ao carregar os dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading };
};

export default useDashboardData;