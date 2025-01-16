// src/hooks/useNotifications.js
import { useEffect, useState } from 'react';

// Hook para buscar notificações de uma API
const useNotifications = () => {
    const [notifications, setNotifications] = useState([]); // Estado para armazenar as notificações
    const [loading, setLoading] = useState(true); // Estado para indicar carregamento
    const [error, setError] = useState(null); // Estado para armazenar erros

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true); // Inicia o carregamento
            setError(null); // Limpa erros anteriores

            try {
                // Exemplo de chamada à API usando fetch
                // const response = await fetch('https://api.seudominio.com/notifications', {
                //     method: 'GET', // Método HTTP
                //     headers: {
                //         'Authorization': `Bearer ${token}`, // Inclua o token JWT se necessário
                //         'Content-Type': 'application/json',
                //     },
                // });

                // Se a resposta não for ok, lança um erro
                // if (!response.ok) {
                //     throw new Error('Erro ao buscar notificações');
                // }

                // Converte a resposta em JSON
                // const data = await response.json();

                // Substitua a simulação de dados por dados reais
                const data = await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve([
                            { id: 1, timestamp: Date.now(), message: 'Nova mensagem de sistema!', type: 'info' },
                            { id: 2, timestamp: Date.now(), message: 'Você tem uma nova solicitação.', type: 'alert' },
                            { id: 3, timestamp: Date.now(), message: 'Atualização disponível!', type: 'update' },
                        ]);
                    }, 2000); // Simula um atraso de 2 segundos
                });

                setNotifications(data); // Atualiza o estado com as notificações recebidas
            } catch (err) {
                setError('Erro ao buscar notificações'); // Atualiza o estado de erro
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchNotifications(); // Chama a função para buscar notificações
    }, []);

    return { notifications, loading, error }; // Retorna as notificações, o estado de carregamento e o erro
};

export default useNotifications;
