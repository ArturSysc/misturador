import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import '../App.css';

const DashboardPage = () => {
        return (
            <div className="d-flex flex-grow-1"> {/* Contêiner flexível que ocupa 100% da altura disponível */}
                    <Dashboard /> {/* Chamando o componente Dashboard */}
            </div>
        );
    
};

export default DashboardPage;