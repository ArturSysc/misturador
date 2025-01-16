import React, { useState } from 'react';
import { Toast, ToastContainer, Button } from 'react-bootstrap';
import { BsBell } from 'react-icons/bs'; // Ícone de notificação do react-icons
import moment from 'moment'; // Para formatação de datas

const NotificationToast = ({ notifications }) => {
    const [showToast, setShowToast] = useState(false);

     // Função para alternar a visibilidade do ToastContainer
     const toggleToast = () => {
        setShowToast(!showToast);
    };

    return (
        <>
            <Button variant="link" onClick={toggleToast} className="position-relative">
                <BsBell 
                    size={24} 
                    style={{ color: notifications.length > 0 ? '#f58a3d' : '#222222' }} // Cor do ícone que muda se houver notificações
                />
            </Button>

            {showToast && (
                <ToastContainer
                    position="absolute"
                    style={{ zIndex: 1050, top: '60px', right: '20px' }} // Ajuste a posição conforme necessário
                >
                    {notifications.map((notification) => (
                        <Toast key={notification.id}>
                            <Toast.Body>
                                <div>
                                    {notification.message}
                                    <small className="text-muted" style={{ display: 'block' }}>
                                        {moment(notification.timestamp).fromNow()} {/* Mostra quanto tempo atrás */}
                                    </small>
                                </div>
                            </Toast.Body>
                        </Toast>
                    ))}
                </ToastContainer>
            )}
        </>
    );
};

export default NotificationToast;