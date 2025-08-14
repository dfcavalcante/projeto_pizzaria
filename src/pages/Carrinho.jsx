import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useData } from '../context/DataContext.jsx';
import { useNotification } from '../context/NotificationContext.jsx';
import { useAuth } from '../context/AuthProvider.jsx';

const Carrinho = ({ setRoute }) => {
    const { cartItems, removeFromCart, clearCart, total, addToCart, decreaseQuantity } = useCart();
    const { placeOrder } = useData();
    const { showNotification } = useNotification();
    const { user } = useAuth();
    
    const [orderType, setOrderType] = useState('mesa');
    const [orderInfo, setOrderInfo] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('loja');
    const [cardInfo, setCardInfo] = useState({ numero: '', nome: '', validade: '', cvv: '' });

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
            showNotification("Seu carrinho está vazio!", 'error');
            return;
        }
        if (!orderInfo) {
            showNotification(`Por favor, informe o ${orderType === 'mesa' ? 'número da mesa' : 'endereço'}!`, 'error');
            return;
        }
        if (paymentMethod === 'cartao' && (cardInfo.numero.length < 16 || !cardInfo.nome || !cardInfo.validade || cardInfo.cvv.length < 3)) {
            showNotification('Preencha todos os dados do cartão.', 'error');
            return;
        }

        const orderDetails = {
            deliveryInfo: { tipo: orderType, valor: orderInfo },
            paymentInfo: { method: paymentMethod }
        };

        placeOrder(cartItems, orderDetails, user.email);
        
        showNotification("Pedido realizado com sucesso!", 'success');
        clearCart();
        setRoute('pedidos-user');
    };
    
    const handleCardInfoChange = (e) => {
        const { name, value } = e.target;
        setCardInfo(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container page-container cart-page">
            <h2 className="page-title">Finalizar Pedido</h2>
            {cartItems.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={`${item.id}-${item.tamanho}`} className="cart-item">
                            <div>
                                <p className="item-name">{item.nome} ({item.tamanho})</p>
                                <p className="item-details">R$ {item.preco.toFixed(2)} / un.</p>
                            </div>
                            {/*CONTROLE DE QUANTIDADE*/}
                            <div className="quantity-control">
                                <button onClick={() => decreaseQuantity(item.id, item.tamanho)} className="quantity-btn">-</button>
                                <span className="quantity-text">{item.quantidade}</span>
                                <button onClick={() => addToCart(item, item.tamanho)} className="quantity-btn">+</button>
                                <button onClick={() => removeFromCart(item.id, item.tamanho)} className="cart-item-remove-button">Remover</button>
                            </div>
                        </div>
                    ))}

                    <div className="cart-summary">
                        {}
                        <div className="cart-total">
                            <span>Total:</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>
                        <div className="cart-order-form">
                            <h3>1. Entrega / Retirada</h3>
                            <select value={orderType} onChange={e => setOrderType(e.target.value)}>
                                <option value="mesa">Consumir na Loja (Mesa)</option>
                                <option value="entrega">Entrega (Delivery)</option>
                            </select>
                            <input
                                type="text"
                                value={orderInfo}
                                onChange={e => setOrderInfo(e.target.value)}
                                placeholder={orderType === 'mesa' ? 'Número da Mesa' : 'Seu Endereço Completo'}
                            />
                        </div>
                        <div className="payment-section">
                            <h3>2. Forma de Pagamento</h3>
                            <div className="payment-options">
                                <label>
                                    <input type="radio" name="payment" value="loja" checked={paymentMethod === 'loja'} onChange={() => setPaymentMethod('loja')} />
                                    Pagar na Loja
                                </label>
                                <label>
                                    <input type="radio" name="payment" value="pix" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} />
                                    PIX
                                </label>
                                <label>
                                    <input type="radio" name="payment" value="cartao" checked={paymentMethod === 'cartao'} onChange={() => setPaymentMethod('cartao')} />
                                    Cartão de Crédito
                                </label>
                            </div>
                            {paymentMethod === 'cartao' && (
                                <div className="payment-details card-form">
                                    <input type="text" name="numero" placeholder="Número do Cartão" value={cardInfo.numero} onChange={handleCardInfoChange} maxLength="16" />
                                    <input type="text" name="nome" placeholder="Nome no Cartão" value={cardInfo.nome} onChange={handleCardInfoChange} />
                                    <div className="card-form-row">
                                        <input type="text" name="validade" placeholder="Validade (MM/AA)" value={cardInfo.validade} onChange={handleCardInfoChange} maxLength="5" />
                                        <input type="text" name="cvv" placeholder="CVV" value={cardInfo.cvv} onChange={handleCardInfoChange} maxLength="4" />
                                    </div>
                                </div>
                            )}
                            {paymentMethod === 'pix' && (
                                <div className="payment-details pix-details">
                                    <p>Chave PIX (CNPJ): <strong>01.234.567/0001-89</strong></p>
                                    <button onClick={() => {
                                        navigator.clipboard.writeText('01.234.567/0001-89');
                                        showNotification('Chave PIX copiada!', 'success');
                                    }} className="copy-pix-button">Copiar Chave</button>
                                    <small>Após o pagamento, seu pedido será confirmado.</small>
                                </div>
                            )}
                            {paymentMethod === 'loja' && (
                                <div className="payment-details">
                                    <p>Você pagará diretamente no caixa ao retirar ou na mesa.</p>
                                </div>
                            )}
                        </div>
                        <button onClick={handlePlaceOrder} className="cart-order-button">
                            Finalizar Pedido
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carrinho;
