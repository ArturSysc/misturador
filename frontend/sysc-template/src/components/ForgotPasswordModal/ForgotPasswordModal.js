// src/components/ForgotPasswordModal/ForgotPasswordModal.js
import React from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Envelope, ShieldLock, Key, CheckCircle } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import theme from '../Theme/theme';

const ForgotPasswordModal = ({
    showForgotModal,
    setShowForgotModal,
    step,
    username,
    setUsername,
    token,
    setToken,
    newPassword,
    setNewPassword,
    message,
    forgotError,
    forgotLoading,
    handleForgotPassword,
    handleValidateToken,
    handleUpdatePassword
}) => {
    const { t } = useTranslation();

    return (
        <Modal show={showForgotModal} size="sm" onHide={() => setShowForgotModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t('passwordRecovery')}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column align-items-center">
                {step === 1 && (
                    <>
                        <Envelope size={50} className="mb-3 text-dark" />
                        <Form.Group controlId="username">
                            <Form.Label>{t('email')}:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={t('emailPlaceholder')}
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        {forgotError && <div className="text-danger text-center mt-2">{forgotError}</div>}
                        {message && <div className="text-success text-center mt-2">{message}</div>}
                        <Button
                            onClick={handleForgotPassword}
                            className="mt-3"
                            style={{ backgroundColor: theme.primary, borderColor: theme.primary }}>
                            {t('sendToken')}
                        </Button>
                        {forgotLoading && <Spinner animation="border" role="status" className="mt-3">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                    </>
                )}
                {step === 2 && (
                    <>
                        <ShieldLock size={50} className="mb-3 text-dark" />
                        <Form.Group controlId="token">
                            <Form.Label>Token:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="token"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                            />
                        </Form.Group>
                        {forgotError && <div className="text-danger text-center mt-2">{forgotError}</div>}
                        {message && <div className="text-success text-center mt-2">{message}</div>}
                        <Button
                            onClick={handleValidateToken}
                            className="mt-3"
                            
                            style={{ backgroundColor: theme.primary, borderColor: theme.primary }}>
                            {t('validateToken')}
                        </Button>
                        {forgotLoading && <Spinner animation="border" role="status" className="mt-3">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                    </>
                )}
                {step === 3 && (
                    <>
                        <Key size={50} className="mb-3 text-dark" />
                        <Form.Group controlId="newPassword">
                            <Form.Label>{t('newPassword')}:</Form.Label>
                            <Form.Control
                                type="password"
                                className="mb-3"
                                placeholder={t('newPassword')}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        {forgotError && <div className="text-danger text-center mt-2">{forgotError}</div>}
                        {message && <div className="text-success text-center mt-2">{message}</div>}
                        <Button
                            onClick={handleUpdatePassword}
                            className="mt-3"
                            style={{ backgroundColor: theme.primary, borderColor: theme.primary }}>
                            {t('updatePassword')}
                        </Button>
                        {forgotLoading && <Spinner animation="border" role="status" className="mt-3">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                    </>
                )}
                {step === 4 && (
                    <>
                        <CheckCircle size={50} className="mb-3" />
                        <div className="text-success text-center mt-2">
                            {message}
                        </div>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ForgotPasswordModal;
