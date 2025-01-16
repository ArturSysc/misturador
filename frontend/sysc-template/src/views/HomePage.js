// src/views/HomePage.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next'; // Importe o hook useTranslation
import '../App.css';

const Home = () => {
    const { user } = useAuth();
    const { t } = useTranslation(); // Inicialize o hook de tradução

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '60vh' }}>
            <h1>{t('home.welcomeMessage')}</h1> {/* Traduz a mensagem de boas-vindas */}
            {user ? (
                <>
                    <h2>{t('home.greeting', { name: user.name })}</h2> {/* Saudação com o nome do usuário */}
                    <h3>{t(`roles.${user.role}`)}</h3> {/* Traduz o cargo/função do usuário */}
                </>
            ) : (
                <h2>{t('home.pleaseLogin')}</h2> 
            )}
        </div>
    );
};

export default Home;
