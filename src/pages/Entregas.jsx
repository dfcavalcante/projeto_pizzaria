import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext.jsx';

// Componente OrderItem definido localmente
const OrderItem = ({ order, onStatusChange, actionText }) => (
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
                    className="order-item-button"
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

const Entregas = () => {
    const { orders, updateOrderStatus } = useContext(DataContext);
    const pedidosProntos = orders.filter(o => o.status === 'pronto');

    return (
        <div className="container page-container">
            <h2 className="page-title">Painel de Entrega / Mesas</h2>
            {pedidosProntos.length > 0 ? (
                <div className="panel-grid">
                    {pedidosProntos.map(order => (
                        <OrderItem
                            key={order.id}
                            order={order}
                            onStatusChange={() => updateOrderStatus(order.id, 'entregue')}
                            actionText={order.details.deliveryInfo.tipo === 'mesa' ? 'Servido' : 'Entregue'}
                        />
                    ))}
                </div>
            ) : (
                <p>Nenhum pedido pronto para entrega ou para ser servido.</p>
            )}
        </div>
    );
};

export default Entregas;