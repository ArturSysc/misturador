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
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        if (mounted) {
          setData((prevData) => {
            // Only update if data is different
            const lastItem = result[result.length - 1];
            const prevLastItem = prevData[prevData.length - 1];
            
            if (!prevLastItem || lastItem.timestamp !== prevLastItem.timestamp) {
              return [...prevData, ...result].slice(-50);
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