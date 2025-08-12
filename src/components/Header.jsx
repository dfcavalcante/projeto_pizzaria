import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

// Ícones como componentes
const PizzaIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10H4.222a2 2 0 01-1.94-2.515l.33-1.02C3.11 4.94 4.54 4 6.002 4h11.996c1.462 0 2.89.94 3.388 2.465l.33 1.02a2 2 0 01-1.94 2.515H14zm-2 4v6m-4-6v6m8-6v6M3 10h18M3 14h18" /></svg>;
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
                    <PizzaIcon />
                    <h1>React Pizzaria</h1>
                </div>
                <div className="header-links">
                    {user && (
                        <>
                            <button onClick={() => setRoute('cardapio')}>Cardápio</button>
                            <button onClick={() => setRoute('cozinha')}>Cozinha</button>
                            <button onClick={() => setRoute('entregas')}>Entregas</button>
                            {user.role === 'admin' && (
                                <button onClick={() => setRoute('admin')}>Admin</button>
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
