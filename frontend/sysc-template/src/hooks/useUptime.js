import { useState, useEffect } from 'react';

const useUptime = () => {
  const [uptime, setUptime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUptime = async () => {
      try {
        const response = await fetch('http://localhost:7000/uptime/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUptime(data.uptime);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUptime();
    const intervalId = setInterval(fetchUptime, 60000); // Atualizar a cada minuto

    return () => clearInterval(intervalId);
  }, []);

  return { uptime, loading, error };
};

export default useUptime;