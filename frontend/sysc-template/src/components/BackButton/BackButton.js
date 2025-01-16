// src/components/BackButton/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
    const navigate = useNavigate(); // Hook de navegação

    // Função para voltar
    const handleBack = () => {
        navigate(-1); // Volta para a página anterior
    };

    return (
        <Button
            variant="link"
            onClick={handleBack}
            className="text-black text-start mt-2"
            style={{ paddingLeft: '0', textDecoration: 'none', fontWeight: '300' }}
        >
            <FaArrowLeft size={24} className="me-2" /> {/* Ícone de voltar */}
        </Button>
    );
};

export default BackButton;
