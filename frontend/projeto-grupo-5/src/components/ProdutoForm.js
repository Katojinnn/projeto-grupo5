import React, { useState } from 'react';

const ProdutoForm = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidadeEmEstoque, setQuantidadeEmEstoque] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const produto = { nome, descricao, preco, quantidadeEmEstoque };
        try {
            await createProduto(produto);
            alert('Produto adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar o produto:', error);
            alert('Erro ao adicionar o produto');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
            <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
            <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço" />
            <input type="number" value={quantidadeEmEstoque} onChange={(e) => setQuantidadeEmEstoque(e.target.value)} placeholder="Quantidade em Estoque" />
            <button type="submit">Salvar</button>
        </form>
    );
};

export default ProdutoForm;
