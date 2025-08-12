import React, { useState, useEffect, useMemo } from 'react';
import { AuthContext } from './AuthContext.jsx';

const MOCK_USERS = [
    { id: 1, email: 'cliente@pizzaria.com', password: '123', role: 'cliente' },
    { id: 2, email: 'admin@pizzaria.com', password: 'admin', role: 'admin' },
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('pizzaria_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email, password) => {
        const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
        if (foundUser) {
            const userData = { email: foundUser.email, role: foundUser.role, token: `fake-token-${Date.now()}` };
            setUser(userData);
            localStorage.setItem('pizzaria_user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('pizzaria_user');
    };

    const authContextValue = useMemo(() => ({ user, login, logout }), [user]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
