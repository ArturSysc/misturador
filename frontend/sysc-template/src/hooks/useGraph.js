import { useState, useEffect } from 'react';

const useGraph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setError(null);
        const response = await fetch('http://localhost:7000/sensores');
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        const result = await response.json();

        console.log("📊 Dados brutos da API:", result);

        if (mounted) {
          if (result.length === 0) {
            throw new Error('Nenhum dado disponível');
          }

          setData((prevData) => {
            const ultimoDado = result[result.length - 1]; // Pegamos apenas o último item

            // Verifica se o dado já está no array para evitar duplicação
            if (!prevData.length || JSON.stringify(prevData[prevData.length - 1]) !== JSON.stringify(ultimoDado)) {
              return [...prevData, ultimoDado].slice(-50); // Mantém no máximo 50 registros
            }
            return prevData;
          });
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return { data, loading, error };
};

export default useGraph;