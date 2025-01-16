// src/components/LoginForm/LoginForm.js
/**
 * Componente LoginForm - Responsável pela UI do formulário de login.
 * 
 * Props:
 * - email (string): estado do email inserido pelo usuário.
 * - setEmail (function): função para atualizar o email no estado do componente pai.
 * - password (string): estado da senha inserida pelo usuário.
 * - setPassword (function): função para atualizar a senha no estado do componente pai.
 * - handleSubmit (function): função para submeter o formulário.
 * - loading (boolean): indica se a requisição de login está em andamento.
 * - error (string): mensagem de erro, exibida quando ocorre uma falha de login.
 */
import React, { useState } from 'react';
import ForgotPasswordModal from '../ForgotPasswordModal/ForgotPasswordModal'; // Importando a modal
import { Form, Button} from 'react-bootstrap';
import { useTranslation } from 'react-i18next'; // Importa useTranslation
import { useNavigate } from 'react-router-dom'; // Para navegação ao registrar
import './LoginForm.css';
import useForgotPassword from '../../hooks/useForgotPassword';
import theme from '../Theme/theme';

const LoginForm = ({ email, setEmail, password, setPassword, handleSubmit, loading, error }) => {
    const { t } = useTranslation(); // Inicializa a tradução
    const navigate = useNavigate()
    const [showForgotModal, setShowForgotModal] = useState(false);
    const {
        step,
        username,
        setUsername,
        token,
        setToken,
        newPassword,
        setNewPassword,
        message,
        error: forgotError,
        loading: forgotLoading,
        handleForgotPassword,
        handleValidateToken,
        handleUpdatePassword
    } = useForgotPassword();


    return (
        <Form onSubmit={handleSubmit} className="login-form">
            {/* Título do formulário */}
            <h2 className="login-title">{t('login')}</h2>

            {/* Campo de entrada para email */}
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>{t('email')}:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
            </Form.Group>

            {/* Campo de entrada para senha */}
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>{t('password')}:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder={t('passwordPlaceholder')}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
            </Form.Group>

            {/* Opção para "Esqueci minha senha" */}
            <Form.Group className="mb-3" controlId="forgotPassword">
                <Form.Check
                    type="checkbox"
                    label={t('forgotPassword')}
                    onClick={() => setShowForgotModal(true)}
                />
            </Form.Group>

            {/* Exibe mensagem de erro se houver algum problema de autenticação */}
            {error && <div className="text-danger">{error}</div>}

            {/* Botão de envio, desabilitado enquanto `loading` for true */}
            <Button
                variant="primary"
                type="submit"
                className="w-100"
                style={{ backgroundColor: theme.primary, borderColor: theme.primary }}
                disabled={loading}>
                {loading ? t('loggingIn') : t('loginButton')}
            </Button>

            {/* Botão para redirecionar ao registro */}
            <Button
                variant="link"
                onClick={() => navigate('/register')}
                className="w-100 mt-3"
            >
                {t('register')}
            </Button>

            {/* Modal para recuperação de senha */}
            <ForgotPasswordModal
                showForgotModal={showForgotModal}
                setShowForgotModal={setShowForgotModal}
                step={step}
                username={username}
                setUsername={setUsername}
                token={token}
                setToken={setToken}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                message={message}
                forgotError={forgotError}
                forgotLoading={forgotLoading}
                handleForgotPassword={handleForgotPassword}
                handleValidateToken={handleValidateToken}
                handleUpdatePassword={handleUpdatePassword}
            />
        </Form>
    );
};

export default LoginForm; // Exporta o componente LoginForm para ser utilizado em outros lugares
