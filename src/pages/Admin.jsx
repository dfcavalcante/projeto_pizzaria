import React, { useState } from 'react';
import { useData } from '../context/DataContext.jsx';

// Componente PizzaFormModal definido localmente
const PizzaFormModal = ({ pizza, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        nome: pizza?.nome || '',
        ingredientes: pizza?.ingredientes || '',
        tamanhos: {
            P: pizza?.tamanhos?.P || 0,
            M: pizza?.tamanhos?.M || 0,
            G: pizza?.tamanhos?.G || 0,
        },
        imagem: pizza?.imagem || 'insira imagem aqui'
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
                <h2>{pizza ? 'Editar Pizza' : 'Nova Pizza'}</h2>
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

// Componente OrderItem definido localmente
const OrderItem = ({ order }) => (
    <div className="order-item">
        <div className="order-item-header">
            <div>
                <h4>Pedido #{order.id}</h4>
                <p>{order.info.tipo === 'mesa' ? 'Mesa' : 'Entrega'}: {order.info.valor}</p>
                <p>{new Date(order.timestamp).toLocaleString()}</p>
            </div>
        </div>
        <div className="order-item-body">
            {order.items.map(item => (
                <p key={`${item.id}-${item.tamanho}`}>{item.quantidade}x {item.nome} ({item.tamanho})</p>
            ))}
            <p style={{textAlign: 'right', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '10px'}}>Status: {order.status}</p>
        </div>
    </div>
);


const Admin = () => {
    const { pizzas, addPizza, updatePizza, deletePizza, orders } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPizza, setCurrentPizza] = useState(null);

    const openModalForNew = () => {
        setCurrentPizza(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (pizza) => {
        setCurrentPizza(pizza);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentPizza(null);
    };

    const handleSavePizza = (pizzaData) => {
        if (currentPizza) {
            updatePizza({ ...currentPizza, ...pizzaData });
        } else {
            addPizza(pizzaData);
        }
        closeModal();
    };

    return (
        <div className="container page-container">
            <h2 className="page-title">Administração</h2>

            <div className="admin-section">
                <div className="admin-section-header">
                    <h3>Gerenciar Cardápio</h3>
                    <button onClick={openModalForNew}>Adicionar Pizza</button>
                </div>
                <div className="admin-list-container">
                    {pizzas.map(pizza => (
                        <div key={pizza.id} className="admin-list-item">
                            <span>{pizza.nome}</span>
                            <div>
                                <button onClick={() => openModalForEdit(pizza)} className="edit-btn">Editar</button>
                                <button onClick={() => {if(window.confirm('Tem certeza que deseja excluir esta pizza?')) deletePizza(pizza.id)}} className="delete-btn">Excluir</button>
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
                        orders.map(order => <OrderItem key={order.id} order={order} />)
                    ) : (
                        <p>Nenhum pedido no histórico.</p>
                    )}
                </div>
            </div>

            {isModalOpen && <PizzaFormModal pizza={currentPizza} onSave={handleSavePizza} onClose={closeModal} />}
        </div>
    );
};

export default Admin;