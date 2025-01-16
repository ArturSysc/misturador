// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import useAuthLogin from '../hooks/useAuthLogin'; // Certifique-se de que o caminho está correto

// Criação do contexto
const AuthContext = createContext();

// Provider do contexto
export const AuthProvider = ({ children }) => {
    const { login, loading, error } = useAuthLogin(); // Chama o hook aqui
    const [user, setUser] = useState(null); // Armazena as informações do usuário
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação
    const bgColor = isAuthenticated ? 'var(--backgroundBlue)' : '#fdf3e5'; // Exemplo: verde se autenticado, vermelho se não autenticado
    
    // Verifica se o usuário está autenticado ao carregar a página
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedAuthToken = localStorage.getItem('authToken');

        if (storedUser && storedAuthToken) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = async (email, password) => {
        try {
            const data = await login(email, password); // Chama a função de login
            setUser(data.user); // Armazena as informações do usuário no estado
            setIsAuthenticated(true); // Define como autenticado
            localStorage.setItem('user', JSON.stringify(data.user)); // Armazena o usuário no localStorage
            localStorage.setItem('authToken', data.token); // Armazena o token no localStorage
        } catch (err) {
            console.error('Erro ao fazer login:', err);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user'); // Remove usuário do localStorage
        localStorage.removeItem('authToken'); // Remove token do localStorage
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, handleLogin, handleLogout, loading, error, bgColor }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar o contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
