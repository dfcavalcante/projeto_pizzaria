import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthProvider.jsx';
import { DataProvider } from './context/DataContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';

// Componentes e Páginas
import Header from './components/Header.jsx';
import Notification from './components/Notification.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Cardapio from './pages/Cardapio.jsx';
import Carrinho from './pages/Carrinho.jsx';
import PedidosUser from './pages/PedidosUser.jsx';
import Cozinha from './pages/Cozinha.jsx';
import Entregas from './pages/Entregas.jsx';
import Admin from './pages/Admin.jsx';
import NotFound from './pages/NotFound.jsx';

// Componente de Layout Principal
const AppLayout = () => {
  return (
    <div className="app">
      <Notification />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

// Configuração do Router
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      { path: '/', element: <Cardapio /> },
      { path: '/cardapio', element: <Cardapio /> },
      { path: '/carrinho', element: <Carrinho /> },
      { path: '/meus-pedidos', element: <PedidosUser /> },
      {
        path: '/cozinha',
        element: <ProtectedRoute role="admin"><Cozinha /></ProtectedRoute>,
      },
      {
        path: '/entregas',
        element: <ProtectedRoute role="admin"><Entregas /></ProtectedRoute>,
      },
      {
        path: '/admin',
        element: <ProtectedRoute role="admin"><Admin /></ProtectedRoute>,
      },
    ],
  },
  {
    path: '*', // Rota para páginas não encontradas
    element: <NotFound />,
  }
]);

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <CartProvider>
          <NotificationProvider>
            <RouterProvider router={router} />
          </NotificationProvider>
        </CartProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
