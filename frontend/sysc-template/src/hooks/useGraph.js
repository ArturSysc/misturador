// src/hooks/useGraph.js
import { useEffect, useState } from 'react';

// Dados fixos para os dias 8 a 11 de novembro
const mockData = {
  timestamps: [
    "2024-11-08T00:00:00Z", "2024-11-08T01:00:00Z", "2024-11-08T02:00:00Z", "2024-11-08T03:00:00Z", "2024-11-08T04:00:00Z",
    "2024-11-08T05:00:00Z", "2024-11-08T06:00:00Z", "2024-11-08T07:00:00Z", "2024-11-09T00:00:00Z", "2024-11-09T01:00:00Z",
    "2024-11-09T02:00:00Z", "2024-11-09T03:00:00Z", "2024-11-09T04:00:00Z", "2024-11-09T05:00:00Z", "2024-11-09T06:00:00Z",
    "2024-11-09T07:00:00Z", "2024-11-10T00:00:00Z", "2024-11-10T01:00:00Z", "2024-11-10T02:00:00Z", "2024-11-10T03:00:00Z",
    "2024-11-10T04:00:00Z", "2024-11-10T05:00:00Z", "2024-11-10T06:00:00Z", "2024-11-10T07:00:00Z", "2024-11-11T00:00:00Z",
    "2024-11-11T01:00:00Z", "2024-11-11T02:00:00Z", "2024-11-11T03:00:00Z", "2024-11-11T04:00:00Z", "2024-11-11T05:00:00Z",
    "2024-11-11T06:00:00Z", "2024-11-11T07:00:00Z",
  ],
  values: [
    12, 19, 3, 5, 2, 9, 13, 4, 15, 16, 23, 22, 10, 18, 14, 11, 17, 20, 24, 13, 8, 7, 10, 12, 16, 14, 9, 22, 17, 21, 19, 15
  ]
};

const useGraph = () => {
  const [data, setData] = useState({
    timestamps: [],
    values: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simula uma chamada de API que retorna os dados fixos
        const fetchApiData = () => new Promise((resolve) => {
          setTimeout(() => resolve(mockData), 1000); // Simula o delay de uma requisição de API
        });

        const responseData = await fetchApiData(); // Obtém os dados "fixos"
        setData(responseData); // Atualiza o estado com os dados

      } catch (error) {
        setError('Erro ao buscar dados: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Chama a função para buscar os dados
  }, []); // O array vazio significa que a função é chamada apenas uma vez, ao montar o componente

  return { data, loading, error };
};

export default useGraph;
