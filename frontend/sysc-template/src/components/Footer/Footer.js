// src/components/Footer/Footer.js
import React from 'react';
import './Footer.css'; 
import { useTranslation } from 'react-i18next';
const Footer = () => {
    const { t } = useTranslation()
    return (
        <footer>
            {/* Link ao redor da imagem para redirecionar */}
            <a href="https://sysc.com.br/about_us/about_us.html" target="_blank" rel="noopener noreferrer">
                <img src={`${process.env.PUBLIC_URL}/images/logo-sysc.png`} alt="Logo Footer" />
            </a>
            <p>&copy; 2024 SYSC System Group. {t('footer')}</p>
        </footer>
    );
};

export default Footer;
