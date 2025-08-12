import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useData } from '../context/DataContext.jsx';

const Carrinho = ({ setRoute }) => {
    const { cartItems, removeFromCart, clearCart, total } = useCart();
    const { placeOrder } = useData();
    const [orderType, setOrderType] = useState('mesa');
    const [orderInfo, setOrderInfo] = useState('');

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        if (!orderInfo) {
            alert(`Por favor, informe o número da ${orderType === 'mesa' ? 'mesa' : 'endereço'}!`);
            return;
        }

        const info = { tipo: orderType, valor: orderInfo };
        placeOrder(cartItems, info);
        alert("Pedido enviado para a cozinha!");
        clearCart();
        setOrderInfo('');
        setRoute('cardapio'); // Redireciona após o pedido
    };

    return (
        <div className="container page-container cart-page">
            <h2 className="page-title">Sua Comanda</h2>
            {cartItems.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={`${item.id}-${item.tamanho}`} className="cart-item">
                            <div>
                                <p className="item-name">{item.nome} ({item.tamanho})</p>
                                <p className="item-details">Qtd: {item.quantidade} x R$ {item.preco.toFixed(2)}</p>
                            </div>
                            <button onClick={() => removeFromCart(item.id, item.tamanho)} className="cart-item-remove-button">Remover</button>
                        </div>
                    ))}

                    <div className="cart-summary">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>
                        <div className="cart-order-form">
                            <select value={orderType} onChange={e => setOrderType(e.target.value)}>
                                <option value="mesa">Mesa</option>
                                <option value="entrega">Entrega</option>
                            </select>
                            <input
                                type="text"
                                value={orderInfo}
                                onChange={e => setOrderInfo(e.target.value)}
                                placeholder={orderType === 'mesa' ? 'Número da Mesa' : 'Endereço de Entrega'}
                            />
                            <button onClick={handlePlaceOrder} className="cart-order-button">
                                Enviar Pedido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carrinho;