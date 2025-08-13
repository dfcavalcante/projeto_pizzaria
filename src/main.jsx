import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { AuthProvider } from './context/AuthProvider.jsx';
import { DataProvider } from './context/DataContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <CartProvider>
          <NotificationProvider> {/* Adicionado aqui */}
            <App />
          </NotificationProvider>
        </CartProvider>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>
);