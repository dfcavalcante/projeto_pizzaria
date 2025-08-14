import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redireciona para a página que o utilizador tentou aceder ou para o cardápio
    const from = location.state?.from?.pathname || "/cardapio";

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (login(email, password)) {
            navigate(from, { replace: true });
        } else {
            setError('Utilizador ou senha inválidos.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-logo">
                    <img src="/Logo.png" alt="Logo da Pizzaria" className="login-logo-img" />
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@pizzaria.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="admin"
                            required
                        />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;