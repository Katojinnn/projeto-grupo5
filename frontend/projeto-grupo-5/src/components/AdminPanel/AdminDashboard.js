import React from 'react';
import { Link } from 'react-router-dom'; // Para navegação
import '../../styles/AdminPanel.css'; // Importa o CSS

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Painel de Administração</h1>
        <p>Gerencie o estoque e catálogo de produtos no seu e-commerce.</p>
      </header>
      
      <div className="admin-dashboard">
        <div className="admin-card">
          <h2>Produtos</h2>
          <ul>
            <li><Link to="/admin/products" className="admin-button">Ver Produtos</Link></li>
            <li><Link to="/admin/products/add" className="admin-button">Adicionar Produto</Link></li>
          </ul>
        </div>

        <div className="admin-card">
          <h2>Vendas</h2>
          <ul>
            <li><Link to="/admin/orders" className="admin-button">Ver Pedidos</Link></li>
            <li><Link to="/admin/orders/history" className="admin-button">Histórico de Vendas</Link></li>
          </ul>
        </div>
      </div>

      {/* Exemplo de tabela de produtos */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Produto Exemplo</td>
            <td>R$ 100,00</td>
            <td>50</td>
            <td>
              <Link to="/admin/products/edit/1" className="admin-button">Editar</Link>
              <Link to="/admin/products/delete/1" className="admin-button">Excluir</Link>
            </td>
          </tr>
          {/* Adicione mais produtos aqui */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
