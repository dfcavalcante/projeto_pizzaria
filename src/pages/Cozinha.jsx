import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext.jsx';

// Componente OrderItem definido localmente
const OrderItem = ({ order, onStatusChange, actionText, actionClass }) => (
    <div className="order-item">
        <div className="order-item-header">
            <div>
                <h4>Pedido #{order.id}</h4>
                <p>{order.details.deliveryInfo.tipo === 'mesa' ? 'Mesa' : 'Entrega'}: {order.details.deliveryInfo.valor}</p>
                <p>{new Date(order.timestamp).toLocaleTimeString()}</p>
            </div>
            {onStatusChange && actionText && (
                <button
                    onClick={onStatusChange}
                    className={`order-item-button ${actionClass || ''}`}
                >
                    {actionText}
                </button>
            )}
        </div>
        <div className="order-item-body">
            {order.items.map(item => (
                <p key={`${item.id}-${item.tamanho}`}>{item.quantidade}x {item.nome} ({item.tamanho})</p>
            ))}
        </div>
    </div>
);


const Cozinha = () => {
    const { orders, updateOrderStatus } = useContext(DataContext);

    const pedidosEmAnalise = orders.filter(o => o.status === 'analise');
    const pedidosEmPreparacao = orders.filter(o => o.status === 'preparando');

    return (
        <div className="container page-container">
            <h2 className="page-title">Painel da Cozinha</h2>

            <div className="admin-section">
                <h3>Novos Pedidos (Em Análise)</h3>
                {pedidosEmAnalise.length > 0 ? (
                    <div className="panel-grid">
                        {pedidosEmAnalise.map(order => (
                            <OrderItem
                                key={order.id}
                                order={order}
                                onStatusChange={() => updateOrderStatus(order.id, 'preparando')}
                                actionText="Aceitar Pedido"
                                actionClass="accept"
                            />
                        ))}
                    </div>
                ) : (
                    <p>Nenhum novo pedido para analisar.</p>
                )}
            </div>

            <div className="admin-section">
                <h3>Pedidos em Preparação</h3>
                {pedidosEmPreparacao.length > 0 ? (
                    <div className="panel-grid">
                        {pedidosEmPreparacao.map(order => (
                            <OrderItem
                                key={order.id}
                                order={order}
                                onStatusChange={() => updateOrderStatus(order.id, 'pronto')}
                                actionText="Pedido Pronto"
                            />
                        ))}
                    </div>
                ) : (
                    <p>Nenhum pedido em preparação no momento.</p>
                )}
            </div>
        </div>
    );
};

export default Cozinha;
