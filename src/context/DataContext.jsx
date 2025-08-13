import React, { useState, useMemo, createContext, useContext } from 'react';

const MOCK_PIZZAS = [
  { id: 1, nome: 'Margherita', ingredientes: 'Molho de tomate, muçarela, manjericão', tamanhos: { P: 25, M: 35, G: 45 }, imagem: '/Margherita.png' },
  { id: 2, nome: 'Calabresa', ingredientes: 'Molho de tomate, muçarela, calabresa, cebola', tamanhos: { P: 28, M: 38, G: 48 }, imagem: '/Calabresa.png' },
  { id: 3, nome: 'Quatro Queijos', ingredientes: 'Molho de tomate, muçarela, provolone, parmesão, gorgonzola', tamanhos: { P: 30, M: 42, G: 55 }, imagem: '/Quatro-Queijos.png' },
  { id: 4, nome: 'Frango com Catupiry', ingredientes: 'Molho de tomate, muçarela, frango desfiado, catupiry', tamanhos: { P: 29, M: 40, G: 52 }, imagem: '/Frango-com-Catupiry.png' },
  { id: 5, nome: 'Portuguesa', ingredientes: 'Molho de tomate, muçarela, presunto, ovo, cebola, azeitona', tamanhos: { P: 32, M: 44, G: 56 }, imagem: '/Portuguesa.png' },
  { id: 6, nome: 'Lombo com Requeijão', ingredientes: 'Molho de tomate, muçarela, lombo canadense, requeijão cremoso', tamanhos: { P: 33, M: 45, G: 58 }, imagem: '/Lombo-com-Requeijão.png' },
  { id: 7, nome: 'Pizza de Chocolate', ingredientes: 'Chocolate derretido, granulado', tamanhos: { P: 35, M: 48, G: 60 }, imagem: '/Pizza-de-Chocolate.png' },
  { id: 8, nome: 'Romeu e Julieta', ingredientes: 'Muçarela, goiabada cremosa', tamanhos: { P: 34, M: 46, G: 59 }, imagem: '/Romeu-e-Julieta.png' },
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

    // --- ESTA É A FUNÇÃO CORRIGIDA ---
    const placeOrder = (items, details, userEmail) => {
        const newOrder = {
            id: nextOrderId,
            userEmail, // Agora o email é salvo no pedido
            items,
            details,
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
