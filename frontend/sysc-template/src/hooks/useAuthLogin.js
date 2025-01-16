/**
 * Hook personalizado para autenticação de login.
 * 
 * Descrição:
 * - Este hook realiza a lógica de autenticação ao se conectar com a API externa de login.
 * - O estado `loading` indica se a requisição está em andamento.
 * - O estado `error` guarda qualquer mensagem de erro retornada pela API.
 * 
 * Funções exportadas:
 * - login: função assíncrona que realiza a autenticação com a API usando email e senha.
 * 
 * Observação:
 * - Como as APIs sempre serão externas, o `fetch` é configurado para aceitar URLs externas.
 */
import { useState } from 'react';

const useAuthLogin = () => {
    const [loading, setLoading] = useState(false); // Indica se a requisição está em andamento
    const [error, setError] = useState(null);      // Armazena mensagens de erro, se houver

    /**
     * Função login - Simula a autenticação.
     * @param {string} email - O email do usuário.
     * @param {string} password - A senha do usuário.
     * @returns {object} dados do usuário, se o login for bem-sucedido.
     * @throws {Error} lança um erro se as credenciais estiverem incorretas.
     */
    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            // Remova o código abaixo e descomente a parte de `fetch` para conectar a uma API
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um delay de 1 segundo

            // Validar credenciais localmente
            if (email === 'usuario@teste.com' && password === 'senha123') {
                // Retornar um objeto que inclui a role do usuário
                return { 
                    token: 'token_simulado_123', 
                    user: { 
                        email, 
                        name: 'Usuário Teste',
                        role: 'user' // Aqui você define a role do usuário
                    } 
                };
            } else {
                throw new Error('Credenciais incorretas');
            }

            // Código para integração futura com API externa
            /*
            const response = await fetch('https://api.example.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login');
            }

            // Certifique-se de que a resposta da API inclua a role
            return {
                token: data.token,
                user: {
                    email: data.user.email,
                    name: data.user.name,
                    role: data.user.role // A role também deve vir da resposta da API
                }
            };
            */

        } catch (err) {
            setError(err.message); // Define a mensagem de erro no estado
            throw err;

        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error }; // Retorna a função de login e os estados de loading e error
};

export default useAuthLogin;
