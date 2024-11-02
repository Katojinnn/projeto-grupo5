// src/components/Admin/AddProduct.js
import React, { useState } from 'react';
import { addProduct } from '../../api';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addProduct({ name, price: parseFloat(price), stock: parseInt(stock) });
        setName('');
        setPrice('');
        setStock('');
        alert('Produto adicionado!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Adicionar Produto</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do Produto"
                required
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Preço"
                required
            />
            <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Estoque"
                required
            />
            <button type="submit">Adicionar</button>
        </form>
    );
};

export default AddProduct;
