// src/components/ModalComponent.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import theme from '../Theme/theme';

const ModalComponent = ({ showModal, handleClose }) => {
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Título do Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Conteúdo do Modal...</p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    style={{ backgroundColor: theme.primary, borderColor: theme.primary }}
                    onClick={handleClose}>Salvar mudanças</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalComponent;
