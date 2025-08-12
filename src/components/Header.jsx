import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

// Ícones
const CartIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const UserIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LogoutIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

const Header = ({ setRoute }) => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useCart();

    const handleLogout = () => {
        logout();
        setRoute('login');
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

    return (
        <header className="header">
            <nav className="container header-nav">
                <div className="header-logo" onClick={() => setRoute('cardapio')}>
                    <img src="/Logo.png" alt="Logo da Pizzaria" className="header-logo-img" />
                    <h1>Manaus Pizza</h1>
                </div>
                <div className="header-links">
                    {user && (
                        <>
                            <button onClick={() => setRoute('cardapio')}>Cardápio</button>
                            
                            {/* --- LÓGICA DE RESTRIÇÃO ADICIONADA AQUI --- */}
                            {user.role === 'admin' && (
                                <>
                                    <button onClick={() => setRoute('cozinha')}>Cozinha</button>
                                    <button onClick={() => setRoute('entregas')}>Entregas</button>
                                    <button onClick={() => setRoute('admin')}>Admin</button>
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className="header-user-section">
                    {user ? (
                        <>
                            <button onClick={() => setRoute('carrinho')} className="cart-button-wrapper">
                                <CartIcon />
                                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                            </button>
                            <span>{user.email}</span>
                            <button onClick={handleLogout}><LogoutIcon /></button>
                        </>
                    ) : (
                        <button onClick={() => setRoute('login')}><UserIcon /></button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;