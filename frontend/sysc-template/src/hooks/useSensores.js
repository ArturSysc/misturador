import { useState, useEffect } from 'react';

const useSensores = () => {
  const [sensores, setSensores] = useState([]); // Estado para armazenar os sensores
  const [loading, setLoading] = useState(true); // Estado para indicar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros

  useEffect(() => {
    const fetchSensores = async () => {
      try {
        setLoading(true); // Inicia o carregamento

        // Faça a requisição para a API
        const response = await fetch('http://localhost:7000/sensores'); // Substitua com sua URL
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados da API'); // Lança um erro se a resposta não for bem-sucedida
        }

        const data = await response.json(); // Converte a resposta para JSON

        // Aqui você pode processar os dados conforme necessário
        setSensores(data); // Armazena todos os dados no estado `sensores`
      } catch (err) {
        setError(err.message); // Armazena a mensagem de erro no estado
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    // Chama fetchSensores imediatamente e depois a cada 10 segundos
    fetchSensores();
    const intervalId = setInterval(fetchSensores, 10000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []); // Array vazio garante que a função só seja chamada ao montar o componente

  return { sensores, loading, error }; // Retorna os estados para serem usados nos componentes
};

export default useSensores;