import React, { useState } from 'react';
import { useData } from '../context/DataContext.jsx';
import PizzaCard from '../components/PizzaCard.jsx';

const Cardapio = () => {
    const { pizzas } = useData();
    const [filter, setFilter] = useState('');

    const filteredPizzas = pizzas.filter(pizza =>
        pizza.nome.toLowerCase().includes(filter.toLowerCase()) ||
        pizza.ingredientes.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="container page-container">
            <h2 className="page-title">Nosso Cardápio</h2>
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filtrar por nome ou ingrediente..."
                className="filter-input"
            />
            <div className="pizza-grid">
                {filteredPizzas.map(pizza => (
                    <PizzaCard key={pizza.id} pizza={pizza} />
                ))}
            </div>
        </div>
    );
};

export default Cardapio;
