import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import Notification from './components/Notification.jsx';
import { useAuth } from './context/AuthProvider.jsx'; // Importação corrigida

function App() {
    const [route, setRoute] = useState('login');
    const { user } = useAuth(); // Usando o hook customizado

    useEffect(() => {
        if (!user) {
            setRoute('login');
        } else if (route === 'login') {
            setRoute('cardapio');
        }
    }, [user, route]);

    return (
        <div className="app">
            <Notification />
            {user && <Header setRoute={setRoute} />}
            <main>
                <AppRoutes route={route} setRoute={setRoute} />
            </main>
        </div>
    );
}

export default App;
