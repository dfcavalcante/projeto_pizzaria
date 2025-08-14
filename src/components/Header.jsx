import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';
import { useCart } from '../context/CartContext.jsx';

// Ícones
const CartIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const LogoutIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const MenuIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;

const Header = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
        navigate('/login');
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="header">
            <nav className="container header-nav">
                <Link to="/cardapio" className="header-logo">
                    <img src="/Logo.png" alt="Logo da Pizzaria" className="header-logo-img" />
                    <h1>Manaus Pizza</h1>
                </Link>

                {/* Menu Desktop */}
                <div className="header-links">
                    <Link to="/cardapio" className="header-link-button">Cardápio</Link>
                    <Link to="/meus-pedidos" className="header-link-button">Meus Pedidos</Link>
                    {user.role === 'admin' && (
                        <>
                            <Link to="/cozinha" className="header-link-button">Cozinha</Link>
                            <Link to="/entregas" className="header-link-button">Entregas</Link>
                            <Link to="/admin" className="header-link-button">Admin</Link>
                        </>
                    )}
                </div>

                <div className="header-user-section">
                    <Link to="/carrinho" className="cart-button-wrapper header-link-button">
                        <CartIcon />
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </Link>
                    <span className="user-email">{user.email}</span>
                    <button onClick={handleLogout} className="header-link-button"><LogoutIcon /></button>
                </div>

                {/* Botão do Menu Mobile */}
                <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <MenuIcon />
                </button>

                {/* Menu Mobile */}
                <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <Link to="/cardapio" className="header-link-button" onClick={handleLinkClick}>Cardápio</Link>
                    <Link to="/meus-pedidos" className="header-link-button" onClick={handleLinkClick}>Meus Pedidos</Link>
                    {user.role === 'admin' && (
                        <>
                            <Link to="/cozinha" className="header-link-button" onClick={handleLinkClick}>Cozinha</Link>
                            <Link to="/entregas" className="header-link-button" onClick={handleLinkClick}>Entregas</Link>
                            <Link to="/admin" className="header-link-button" onClick={handleLinkClick}>Admin</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;