import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, role, setRoute }) => {
    const { user } = useAuth();

    if (!user) {
        // Em uma app real com React Router, usaríamos <Navigate to="/login" />
        // Aqui, forçamos a rota de login.
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