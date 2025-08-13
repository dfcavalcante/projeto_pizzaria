import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext.jsx';
import { useNotification } from '../context/NotificationContext.jsx';

// O componente PizzaFormModal para ADICIONAR novas pizzas continua o mesmo
const PizzaFormModal = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({
        nome: '',
        ingredientes: '',
        tamanhos: { P: 0, M: 0, G: 0 },
        imagem: '/placeholder.png' // Imagem padrão para novas pizzas
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSizeChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            tamanhos: { ...prev.tamanhos, [name]: parseFloat(value) || 0 }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Nova Pizza</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Ingredientes</label>
                        <textarea name="ingredientes" value={formData.ingredientes} onChange={handleChange} required />
                    </div>
                    <div className="price-group form-group">
                        <div>
                            <label>Preço P</label>
                            <input type="number" name="P" value={formData.tamanhos.P} onChange={handleSizeChange} required />
                        </div>
                        <div>
                            <label>Preço M</label>
                            <input type="number" name="M" value={formData.tamanhos.M} onChange={handleSizeChange} required />
                        </div>
                        <div>
                            <label>Preço G</label>
                            <input type="number" name="G" value={formData.tamanhos.G} onChange={handleSizeChange} required />
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">Cancelar</button>
                        <button type="submit" className="save-btn">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Admin = () => {
    const { pizzas, addPizza, updatePizza, deletePizza, orders } = useData();
    const { showNotification } = useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Estado local para gerenciar as edições de preço antes de salvar
    const [editablePizzas, setEditablePizzas] = useState([]);

    useEffect(() => {
        // Clona as pizzas do contexto para o estado local para permitir edição
        setEditablePizzas(JSON.parse(JSON.stringify(pizzas)));
    }, [pizzas]);

    const handlePriceChange = (pizzaId, size, value) => {
        setEditablePizzas(currentPizzas => 
            currentPizzas.map(p => {
                if (p.id === pizzaId) {
                    return {
                        ...p,
                        tamanhos: { ...p.tamanhos, [size]: parseFloat(value) || 0 }
                    };
                }
                return p;
            })
        );
    };

    const handleSaveChanges = (pizzaId) => {
        const pizzaToUpdate = editablePizzas.find(p => p.id === pizzaId);
        if (pizzaToUpdate) {
            updatePizza(pizzaToUpdate);
            showNotification('Preços atualizados com sucesso!', 'success');
        }
    };

    const handleAddNewPizza = (pizzaData) => {
        addPizza(pizzaData);
        showNotification('Nova pizza adicionada ao cardápio!', 'success');
        setIsModalOpen(false);
    };

    // --- COMPONENTE CORRIGIDO AQUI ---
    // Adicionado "optional chaining" (?.) para evitar erros se 'order.details' não existir
    const OrderItem = ({ order }) => (
        <div className="order-item">
            <div className="order-item-header">
                <div>
                    <h4>Pedido #{order.id}</h4>
                    <p>{order.details?.deliveryInfo?.tipo === 'mesa' ? 'Mesa' : 'Entrega'}: {order.details?.deliveryInfo?.valor}</p>
                    <p>{new Date(order.timestamp).toLocaleString()}</p>
                </div>
            </div>
            <div className="order-item-body">
                {order.items.map(item => (
                    <p key={`${item.id}-${item.tamanho}`}>{item.quantidade}x {item.nome} ({item.tamanho})</p>
                ))}
                <p className="order-details-footer">
                    <span>Pagamento: <strong>{order.details?.paymentInfo?.method}</strong></span>
                    <span>Status: <strong>{order.status}</strong></span>
                </p>
            </div>
        </div>
    );

    return (
        <div className="container page-container">
            <h2 className="page-title">Administração</h2>

            <div className="admin-section">
                <div className="admin-section-header">
                    <h3>Gerenciar Cardápio</h3>
                    <button onClick={() => setIsModalOpen(true)}>Adicionar Pizza</button>
                </div>
                <div className="admin-list-container">
                    {editablePizzas.map(pizza => (
                        <div key={pizza.id} className="admin-pizza-item">
                            <span className="pizza-name">{pizza.nome}</span>
                            <div className="price-inputs">
                                <label>P: R$ <input type="number" value={pizza.tamanhos.P} onChange={(e) => handlePriceChange(pizza.id, 'P', e.target.value)} className="admin-price-input" /></label>
                                <label>M: R$ <input type="number" value={pizza.tamanhos.M} onChange={(e) => handlePriceChange(pizza.id, 'M', e.target.value)} className="admin-price-input" /></label>
                                <label>G: R$ <input type="number" value={pizza.tamanhos.G} onChange={(e) => handlePriceChange(pizza.id, 'G', e.target.value)} className="admin-price-input" /></label>
                            </div>
                            <div className="pizza-actions">
                                <button onClick={() => handleSaveChanges(pizza.id)} className="admin-save-btn">Salvar</button>
                                <button onClick={() => {if(window.confirm('Tem certeza?')) deletePizza(pizza.id)}} className="delete-btn">Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="admin-section">
                <div className="admin-section-header">
                    <h3>Histórico de Pedidos</h3>
                </div>
                <div className="admin-list-container">
                    {orders.length > 0 ? (
                        orders.slice().reverse().map(order => <OrderItem key={order.id} order={order} />)
                    ) : (
                        <p>Nenhum pedido no histórico.</p>
                    )}
                </div>
            </div>

            {isModalOpen && <PizzaFormModal onSave={handleAddNewPizza} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default Admin;
