import { useState, useEffect } from 'react';

const useGraph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:7000/sensores');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        setData((prevData) => {
          return [...prevData, ...result].slice(-50);
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return { data, loading, error };
};

export default useGraph;
