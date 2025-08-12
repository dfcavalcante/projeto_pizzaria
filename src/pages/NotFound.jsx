import React from 'react';

const NotFound = ({ setRoute }) => {
    return (
        <div className="container page-container" style={{ textAlign: 'center' }}>
            <h2 className="page-title">404 - Página Não Encontrada</h2>
            <p>A página que você está procurando não existe.</p>
            <button onClick={() => setRoute('cardapio')} style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '1rem'
            }}>
                Voltar ao Cardápio
            </button>
        </div>
    );
};

export default NotFound;
