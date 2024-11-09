import React from 'react';
import ProdutoForm from '../components/ProdutoForm';
import CategoriaList from '../components/CategoriaList';
import ProdutoList from '../components/ProdutoList';

const Admin = () => (
    <div>
        <h1>Administração</h1>
        <CategoriaList />
        <ProdutoList />
        <ProdutoForm />
    </div>
);

export default Admin;
