import React, { useState, useMemo, createContext, useContext } from 'react';

// 1. Cria o contexto
export const CartContext = createContext(null);

// 2. Cria o Provedor (Provider) que vai gerenciar e fornecer o estado
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (pizza, tamanho) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === pizza.id && item.tamanho === tamanho);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === pizza.id && item.tamanho === tamanho
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            }
            return [...prevItems, { ...pizza, tamanho, preco: pizza.tamanhos[tamanho], quantidade: 1 }];
        });
    };

    const removeFromCart = (itemId, tamanho) => {
        setCartItems(prevItems => prevItems.filter(item => !(item.id === itemId && item.tamanho === tamanho)));
    };
    
    const clearCart = () => {
        setCartItems([]);
    };

    const total = useMemo(() =>
        cartItems.reduce((acc, item) => acc + item.preco * item.quantidade, 0),
        [cartItems]
    );

    const cartContextValue = useMemo(() => ({ cartItems, addToCart, removeFromCart, clearCart, total }), [cartItems, total]);

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};

// 3. Cria e exporta o Hook customizado 'useCart' que os componentes usarão
export const useCart = () => useContext(CartContext);
