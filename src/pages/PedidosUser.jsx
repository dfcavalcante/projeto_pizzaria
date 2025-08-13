import React from 'react';
import { useData } from '../context/DataContext.jsx';
import { useAuth } from '../context/AuthProvider.jsx';

// Mapeamento de status para textos mais amigáveis
const statusText = {
    analise: 'Seu pedido está em análise pelo restaurante.',
    preparando: 'Seu pedido está sendo preparado!',
    pronto: 'Seu pedido está pronto para retirada/entrega!',
    entregue: 'Seu pedido foi entregue!',
};

const PedidosUser = () => {
    const { orders } = useData();
    const { user } = useAuth();

    const userOrders = orders.filter(order => order.userEmail === user.email).reverse();

    return (
        <div className="container page-container">
            <h2 className="page-title">Meus Pedidos</h2>
            {userOrders.length > 0 ? (
                userOrders.map(order => (
                    <div key={order.id} className="order-item-user">
                        <div className="order-item-user-header">
                            <h4>Pedido #{order.id}</h4>
                            <span>{new Date(order.timestamp).toLocaleDateString()} às {new Date(order.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="order-item-body">
                            {order.items.map(item => (
                                <p key={`${item.id}-${item.tamanho}`}>{item.quantidade}x {item.nome} ({item.tamanho})</p>
                            ))}
                        </div>
                        <div className="order-item-user-footer">
                            <p className="status-text">
                                <strong>Status:</strong> {statusText[order.status] || 'Status desconhecido'}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p>Você ainda não fez nenhum pedido.</p>
            )}
        </div>
    );
};

export default PedidosUser;
