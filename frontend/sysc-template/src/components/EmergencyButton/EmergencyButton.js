// src/components/EmergencyButton/EmergencyButton.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa'; // Ícone de alerta

const EmergencyButton = () => {
    const [isEmergency, setIsEmergency] = useState(false); // Estado para controlar se está em emergência

    // Função para alternar o estado de emergência
    const handleEmergency = () => {
        setIsEmergency(!isEmergency); // Alterna o estado de emergência
        // Aqui você pode adicionar qualquer ação extra, como enviar um alerta para a API ou mostrar uma notificação
    };

    return (
        <Button
            variant={isEmergency ? "danger" : "warning"} // Cor do botão muda dependendo do estado
            onClick={handleEmergency}
            className="text-white mt-2"
            style={{
                textDecoration: 'none',
                fontWeight: '300',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <FaExclamationTriangle size={24} className="me-2" /> {/* Ícone de alerta */}
            {isEmergency ? "Emergência Ativada" : "Ativar Emergência"} {/* Texto do botão */}
        </Button>
    );
};

export default EmergencyButton;
