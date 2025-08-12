import React, { useState, useMemo, createContext, useContext } from 'react';

const MOCK_PIZZAS = [
  { id: 1, nome: 'Margherita', ingredientes: 'Molho de tomate, muçarela, manjericão', tamanhos: { P: 25, M: 35, G: 45 }, imagem: 'insira imagem aqui' },
  { id: 2, nome: 'Calabresa', ingredientes: 'Molho de tomate, muçarela, calabresa, cebola', tamanhos: { P: 28, M: 38, G: 48 }, imagem: 'insira imagem aqui' },
  { id: 3, nome: 'Quatro Queijos', ingredientes: 'Molho de tomate, muçarela, provolone, parmesão, gorgonzola', tamanhos: { P: 30, M: 42, G: 55 }, imagem: 'insira imagem aqui' },
  { id: 4, nome: 'Frango com Catupiry', ingredientes: 'Molho de tomate, muçarela, frango desfiado, catupiry', tamanhos: { P: 29, M: 40, G: 52 }, imagem: 'insira imagem aqui' },
];

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState(MOCK_PIZZAS);
    const [orders, setOrders] = useState([]);
    const [nextOrderId, setNextOrderId] = useState(1);

    const addPizza = (pizzaData) => {
        const newPizza = { ...pizzaData, id: pizzas.length > 0 ? Math.max(...pizzas.map(p => p.id)) + 1 : 1 };
        setPizzas(prev => [...prev, newPizza]);
    };

    const updatePizza = (updatedPizza) => {
        setPizzas(prev => prev.map(p => p.id === updatedPizza.id ? updatedPizza : p));
    };

    const deletePizza = (pizzaId) => {
        setPizzas(prev => prev.filter(p => p.id !== pizzaId));
    };

    const placeOrder = (items, info) => {
        const newOrder = {
            id: nextOrderId,
            items,
            info,
            status: 'preparando',
            timestamp: new Date()
        };
        setOrders(prev => [...prev, newOrder]);
        setNextOrderId(prev => prev + 1);
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    const dataContextValue = useMemo(() => ({
        pizzas, addPizza, updatePizza, deletePizza,
        orders, placeOrder, updateOrderStatus
    }), [pizzas, orders]);

    return (
        <DataContext.Provider value={dataContextValue}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
