import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import { useAuth } from './context/AuthContext.jsx';

function App() {
    // Simulação do React Router
    const [route, setRoute] = useState('login');
    const { user } = useAuth();

    // Efeito para lidar com a mudança de rota e proteção
    useEffect(() => {
        if (!user) {
            setRoute('login');
        } else if (route === 'login') {
            setRoute('cardapio');
        }
    }, [user, route]);

    return (
        <div className="app">
            {user && <Header setRoute={setRoute} />}
            <main>
                <AppRoutes route={route} setRoute={setRoute} />
            </main>
        </div>
    );
}

export default App;