import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useNotification } from '../context/NotificationContext.jsx'; // Importar o hook

const PizzaCard = ({ pizza }) => {
    const { addToCart } = useCart();
    const { showNotification } = useNotification(); // Usar o hook
    const [selectedSize, setSelectedSize] = useState('M');

    const handleAddToCart = () => {
        addToCart(pizza, selectedSize);
        // --- alert() substituído aqui ---
        showNotification(`${pizza.nome} adicionada ao carrinho!`, 'success');
    };

    return (
        <div className="pizza-card">
            <img src={pizza.imagem} alt={`Pizza de ${pizza.nome}`} className="pizza-card-image" />
            
            <div className="pizza-card-body">
                <h3>{pizza.nome}</h3>
                <p>{pizza.ingredientes}</p>
                <div className="pizza-card-footer">
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                    >
                        {Object.keys(pizza.tamanhos).map(tamanho => (
                            <option key={tamanho} value={tamanho}>{tamanho}</option>
                        ))}
                    </select>
                    <span className="pizza-card-price">
                        R$ {pizza.tamanhos[selectedSize].toFixed(2)}
                    </span>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="pizza-card-button"
                >
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    );
};

export default PizzaCard;