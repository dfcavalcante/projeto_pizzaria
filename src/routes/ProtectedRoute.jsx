import React from 'react';
import { useAuth } from '../context/AuthProvider.jsx'; // Importação corrigida

const ProtectedRoute = ({ children, role, setRoute }) => {
    const { user } = useAuth(); // Usando o hook customizado

    if (!user) {
        setTimeout(() => setRoute('login'), 0);
        return <p>Redirecionando para o login...</p>;
    }

    if (role && user.role !== role) {
        return (
            <div className="container page-container">
                <h2>Acesso Negado</h2>
                <p>Você não tem permissão para visualizar esta página.</p>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
