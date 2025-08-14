import React from 'react';
import { useAuth } from '../context/AuthProvider.jsx';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Redireciona para o login, guardando a página que o utilizador tentou aceder
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && user.role !== role) {
        // Redireciona para a página de "não encontrado" ou uma página de acesso negado
        return <Navigate to="/cardapio" replace />;
    }

    return children;
};

export default ProtectedRoute;
