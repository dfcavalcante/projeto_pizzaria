import React, { useState, useMemo, createContext, useContext } from 'react';

export const CartContext = createContext(null);

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
            // Se o item não existe, adiciona com quantidade 1
            return [...prevItems, { ...pizza, tamanho, preco: pizza.tamanhos[tamanho], quantidade: 1 }];
        });
    };

    const removeFromCart = (itemId, tamanho) => {
        setCartItems(prevItems => prevItems.filter(item => !(item.id === itemId && item.tamanho === tamanho)));
    };

    // --- NOVA FUNÇÃO ADICIONADA ---
    const decreaseQuantity = (itemId, tamanho) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === itemId && item.tamanho === tamanho) {
                    // Se a quantidade for maior que 1, apenas diminui
                    if (item.quantidade > 1) {
                        return { ...item, quantidade: item.quantidade - 1 };
                    }
                    // Se for 1, retorna null para ser filtrado depois
                    return null;
                }
                return item;
            }).filter(Boolean) // Remove os itens que retornaram null
        );
    };
    
    const clearCart = () => {
        setCartItems([]);
    };

    const total = useMemo(() =>
        cartItems.reduce((acc, item) => acc + item.preco * item.quantidade, 0),
        [cartItems]
    );

    const cartContextValue = useMemo(() => ({ cartItems, addToCart, removeFromCart, decreaseQuantity, clearCart, total }), [cartItems, total]);

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);