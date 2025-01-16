// src/components/LanguageSwitcher.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(true); // Estado para controle do toggle

  const toggleLanguage = () => {
    const newLang = isEnglish ? 'pt' : 'en';
    i18n.changeLanguage(newLang);
    setIsEnglish(!isEnglish); // Alterna o estado
  };

  return (
    <div 
      onClick={toggleLanguage} 
      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--textPrimary)', fontWeight: 'bold' }}>
      {isEnglish ? 'BR' : 'EN'}
    </div>
  );
};
export default LanguageSwitcher;