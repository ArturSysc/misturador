import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './RegisterForm.css'; // Importa o arquivo de estilos
import theme from '../Theme/theme';

const RegisterForm = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleSubmit, loading, error }) => {
    const { t } = useTranslation(); // Inicializa a tradução

    return (
        <Form onSubmit={handleSubmit} className="register-form">
            {/* Título do formulário */}
            <h2 className="login-title">{t('registerForm.title')}</h2>

            {/* Campo de entrada para email */}
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>{t('registerForm.emailLabel')}</Form.Label>
                <Form.Control
                    type="email"
                    placeholder={t('registerForm.emailPlaceholder')}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
            </Form.Group>

            {/* Campo de entrada para senha */}
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>{t('registerForm.passwordLabel')}</Form.Label>
                <Form.Control
                    type="password"
                    placeholder={t('registerForm.passwordPlaceholder')}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
            </Form.Group>

            {/* Campo de entrada para confirmação de senha */}
            <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>{t('registerForm.confirmPasswordLabel')}</Form.Label>
                <Form.Control
                    type="password"
                    placeholder={t('registerForm.confirmPasswordPlaceholder')}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                />
            </Form.Group>

            {/* Exibe mensagem de erro se houver algum problema de autenticação */}
            {error && <div className="text-danger">{error}</div>}

            {/* Botão de envio, desabilitado enquanto `loading` for true */}
            <Button 
                variant="primary" 
                type="submit" 
                className="w-100" 
                disabled={loading}
                style={{ backgroundColor: theme.primary, borderColor: theme.primary }}>
                {loading ? t('registerForm.loading') : t('registerForm.submit')}
            </Button>
        </Form>
    );
};

export default RegisterForm; // Exporta o componente RegisterForm para ser utilizado em outros lugares
