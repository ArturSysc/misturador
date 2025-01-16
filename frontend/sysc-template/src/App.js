// src/App.js
import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import theme from './components/Theme/theme';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DashboardPage from './views/DashboardPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './services/language/language';

const ContentWrapper = () => {
    const { bgColor } = useAuth(); // Acessa a cor de fundo do contexto

    return (
        <div className="content" style={{ backgroundColor: bgColor, flex: 1 }}>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                {/* <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/itens" element={<CRUDPage />} /> */}
                {/* Protegendo as rotas com o ProtectedRoute */}
                {/* <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/graph"
                    element={
                        <ProtectedRoute>
                            <GraphPage />
                        </ProtectedRoute>
                    }
                /> */}
            </Routes>
        </div>
    );
};

const App = () => {
    useEffect(() => {
        Object.keys(theme).forEach((key) => {
            document.documentElement.style.setProperty(`--${key}`, theme[key]);
        });
    }, []);

    return (
        <AuthProvider>
            <Router>
                <div className="app-container d-flex flex-column min-vh-100">
                    <Header />
                    <ContentWrapper /> {/* Substitui o conteúdo diretamente pelo ContentWrapper */}
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
