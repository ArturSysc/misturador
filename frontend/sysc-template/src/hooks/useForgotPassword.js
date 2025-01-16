import { useState } from 'react';

/**
 * Hook para gerenciar o processo de recuperação de senha.
 * O processo é dividido em 3 etapas:
 * 1. Envio de email para recuperação.
 * 2. Validação de token.
 * 3. Atualização da senha.
 * 
 * @returns {Object} Objeto com estados e funções para controlar o processo.
 */
const useForgotPassword = () => {
    const [step, setStep] = useState(1);  // Etapa atual do processo
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);  // Estado de carregamento

    const clearError = () => setError(null); // Função para limpar o erro

    /**
     * Função que simula o envio de email para recuperação de senha.
     * Usando setTimeout para simular o comportamento de uma chamada real.
     */
    const handleForgotPassword = async () => {
        clearError();
        setLoading(true); // Inicia o carregamento
        // Simulação de chamada de API com setTimeout
        setTimeout(() => {
            if (username === 'usuario@teste.com') {
                setMessage('Token enviado para o email usu**********.com.');
                setStep(2); // Avança para a próxima etapa
            } else {
                setError('Email não encontrado.');
            }
            setLoading(false); // Finaliza o carregamento
        }, 5000);

        // Aqui seria a chamada real com fetch (comentada)
        /*
        try {
            const response = await fetch('/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username }),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar email');
            }

            const data = await response.json();
            setMessage(`Token enviado para o email ${username}.`);
            setStep(2);  // Avança para a próxima etapa
        } catch (err) {
            setError(err.message || 'Erro ao enviar email');
        } finally {
            setLoading(false);  // Finaliza o carregamento
        }
        */
    };

    /**
     * Função que simula a validação de token.
     * Usando setTimeout para simular o comportamento de uma chamada real.
     */
    const handleValidateToken = async () => {
        clearError();
        setLoading(true); // Inicia o carregamento
        // Simulação de chamada de API com setTimeout
        setTimeout(() => {
            if (token === '1234') {
                setMessage('Token válido, insira a nova senha.');
                setStep(3);  // Avança para a próxima etapa
            } else {
                setError('Token inválido.');
            }
            setLoading(false); // Finaliza o carregamento
        }, 1000);

        // Aqui seria a chamada real com fetch (comentada)
        /*
        try {
            const response = await fetch('/validate-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (!response.ok) {
                throw new Error('Token inválido');
            }

            const data = await response.json();
            setMessage('Token válido, insira a nova senha.');
            setStep(3);  // Avança para a próxima etapa
        } catch (err) {
            setError(err.message || 'Erro ao validar token');
        } finally {
            setLoading(false);  // Finaliza o carregamento
        }
        */
    };

    /**
     * Função que simula a atualização de senha.
     * Usando setTimeout para simular o comportamento de uma chamada real.
     */
    const handleUpdatePassword = async () => {
        clearError();
        setLoading(true); // Inicia o carregamento
        // Simulação de chamada de API com setTimeout
        setTimeout(() => {
            if (newPassword === 'senha123') {
                setMessage('Senha atualizada com sucesso.');
                setStep(4);  // Finaliza o processo
            } else {
                setError('A senha não atende aos requisitos.');
            }
            setLoading(false); // Finaliza o carregamento
        }, 1000);

        // Aqui seria a chamada real com fetch (comentada)
        /*
        try {
            const response = await fetch('/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar senha');
            }

            const data = await response.json();
            setMessage('Senha atualizada com sucesso.');
            setStep(4);  // Finaliza o processo
        } catch (err) {
            setError(err.message || 'Erro ao atualizar senha');
        } finally {
            setLoading(false);  // Finaliza o carregamento
        }
        */
    };

    return {
        step,
        username,
        setUsername,
        token,
        setToken,
        newPassword,
        setNewPassword,
        message,
        error,
        loading,  // Estado de carregamento
        handleForgotPassword,
        handleValidateToken,
        handleUpdatePassword
    };
};

export default useForgotPassword;
