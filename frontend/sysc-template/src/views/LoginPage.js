// src/views/LoginPage.js

/**
 * View LoginPage - Combina o formulário de login e a lógica de autenticação.
 * 
 * Descrição:
 * - Usa o componente LoginForm para renderizar a UI do formulário.
 * - Conecta-se ao context AuthContext para realizar a autenticação.
 * - Após a autenticação bem-sucedida, redireciona o usuário para a página principal do aplicativo.
 * 
 * Estado local:
 * - email: armazena o email digitado pelo usuário.
 * - password: armazena a senha digitada pelo usuário.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm/LoginForm';
import BackButton from '../components/BackButton/BackButton';
import '../App.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');        // Estado para o email do usuário
    const [password, setPassword] = useState('');  // Estado para a senha do usuário
    const { handleLogin, loading, error } = useAuth(); // Importa a lógica de autenticação
    const navigate = useNavigate(); // Navegação para redirecionamento pós-login

    /**
     * handleLogin - Lida com a submissão do formulário de login.
     * - Realiza a chamada ao hook login com email e senha.
     * - Em caso de sucesso, redireciona para o aplicativo principal.
     * 
     * @param {object} e - Evento de submissão do formulário.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin(email, password); // Chama a função de login do hook
            navigate('/');             // Redireciona para a rota home após o login
        } catch (err) {
            console.error("Erro ao fazer login:", err.message); // Exibe erro no console para depuração
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
            <BackButton/> {/* Usa o componente BackButton */}
            {/* Formulário de registro */}
            <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default LoginPage;
