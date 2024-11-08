import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importe os componentes
import HomePage from './components/HomePage'; // Página principal
import ProductCatalog from './components/UserPanel/ProductCatalog'; // Catálogo de Produtos
import AdminDashboard from './components/AdminPanel/AdminDashboard'; // Painel do Administrador
import Login from './components/Auth/Login'; // Login
import Register from './components/Auth/Register'; // Registro
import ProductForm from './components/AdminPanel/ProductForm'; // Formulário de Produto

// Importando os arquivos de estilo
import './index.css';
import './styles/AdminPanel.css';
import './styles/UserPanel.css';
import './styles/ProductForm.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Página inicial - HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Painel de Administração */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/product-form" element={<ProductForm />} />

        {/* Catálogo de Produtos (Painel do Usuário) */}
        <Route path="/catalog" element={<ProductCatalog />} />

        {/* Rotas de Autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
