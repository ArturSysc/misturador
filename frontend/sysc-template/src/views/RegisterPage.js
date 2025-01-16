// src/components/RegisterPage/RegisterPage.js
import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import RegisterForm from '../components/RegisterForm/RegisterForm'; // Importa o formulário de registro
import BackButton from '../components/BackButton/BackButton'; // Importa o componente Botão de voltar
import '../App.css';

const RegisterPage = () => {
    // Estados para armazenar os dados do formulário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // Estado para a mensagem de sucesso

    const navigate = useNavigate(); // Cria a função de navegação

    // Função simulada de registro (Substitua pela sua real)
    const handleRegister = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        setLoading(true); // Indica que o registro está em andamento
        setError(null); // Limpa qualquer erro anterior
        setSuccessMessage(null); // Limpa a mensagem de sucesso anterior

        try {
            // Validação simples
            if (password !== confirmPassword) {
                throw new Error("As senhas não correspondem.");
            }

            // Simulação de uma API (substitua pela lógica da sua API real)
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula uma chamada de API

            // Se o registro for bem-sucedido, define a mensagem de sucesso
            setSuccessMessage("Registro bem-sucedido!");
            navigate('/'); // Redireciona para a página inicial ("/")
        } catch (err) {
            setError(err.message); // Define a mensagem de erro no estado
        } finally {
            setLoading(false); // Reseta o estado de loading
        }
    };

    return (
        <div className="container d-flex flex-column align-items-start flex-grow-1"> {/* Alinha itens à esquerda e ocupa espaço restante */}
            <BackButton/> {/* Usa o componente BackButton */}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}{/* Exibe mensagem de sucesso se houver */}
            {error && <Alert variant="danger">{error}</Alert>}{/* Exibe mensagem de erro se houver */}
            <RegisterForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                handleSubmit={handleRegister}
                loading={loading}
                error={error}
            />
        </div>
    );

};

export default RegisterPage; // Exporta o componente RegisterPage
