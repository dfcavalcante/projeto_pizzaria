import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

const PizzaCard = ({ pizza }) => {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState('M');

    const handleAddToCart = () => {
        addToCart(pizza, selectedSize);
        alert(`${pizza.nome} (${selectedSize}) adicionada ao carrinho!`);
    };

    return (
        <div className="pizza-card">
            <div className="pizza-card-image">
                {pizza.imagem}
            </div>
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