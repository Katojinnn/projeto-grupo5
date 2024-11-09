import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProdutoDetails = () => {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await fetch('http://localhost:8080/produtos');
                if (!response.ok) {
                    throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
                }
                const produtos = await response.json();
                const produtoEncontrado = produtos.find(prod => prod.id === Number(id));
                setProduto(produtoEncontrado);
            } catch (error) {
                console.error('Erro ao buscar o produto:', error);
                alert('Erro ao carregar detalhes do produto');
            }
        };

        fetchProduto();
    }, [id]);

    if (!produto) {
        return <p>Carregando detalhes do produto...</p>;
    }

    return (
        <div>
            <h2>{produto.nome}</h2>
            <p><strong>Descrição:</strong> {produto.descricao}</p>
            <p><strong>Preço:</strong> R$ {produto.preco}</p>
            <p><strong>Quantidade em Estoque:</strong> {produto.quantidadeEmEstoque}</p>
            <p><strong>Categoria:</strong> {produto.categoria ? produto.categoria.nome : 'Sem Categoria'}</p>
        </div>
    );
};

export default ProdutoDetails;
