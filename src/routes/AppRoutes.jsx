import React from 'react';
import ProtectedRoute from './ProtectedRoute.jsx';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

// Importando as páginas
import Login from '../pages/Login.jsx';
import Cardapio from '../pages/Cardapio.jsx';
import Cozinha from '../pages/Cozinha.jsx';
import Entregas from '../pages/Entregas.jsx';
import Admin from '../pages/Admin.jsx';
import Carrinho from '../pages/Carrinho.jsx';
import NotFound from '../pages/NotFound.jsx';

const AppRoutes = ({ route, setRoute }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Login setRoute={setRoute} />;
    }

    switch (route) {
        case 'cardapio':
            return <ProtectedRoute setRoute={setRoute}><Cardapio /></ProtectedRoute>;
        case 'carrinho':
            return <ProtectedRoute setRoute={setRoute}><Carrinho setRoute={setRoute} /></ProtectedRoute>;
        
        {/* --- ROTAS PROTEGIDAS PARA ADMIN --- */}
        case 'cozinha':
            return <ProtectedRoute setRoute={setRoute} role="admin"><Cozinha /></ProtectedRoute>;
        case 'entregas':
            return <ProtectedRoute setRoute={setRoute} role="admin"><Entregas /></ProtectedRoute>;
        case 'admin':
            return <ProtectedRoute setRoute={setRoute} role="admin"><Admin /></ProtectedRoute>;
        
        case 'login':
             return <Login setRoute={setRoute} />;
        default:
            return <NotFound setRoute={setRoute} />;
    }
};

export default AppRoutes;