import React, { useEffect, useState } from 'react';

const ProdutoList = () => {
    const [produtos, setProdutos] = useState([]);
    const [erro, setErro] = useState(null); // Para armazenar erro

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://localhost:8080/produtos');
                
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                setErro(error.message);  // Salva a mensagem de erro
            }
        };

        fetchProdutos();
    }, []);

    if (erro) {
        return <p>{erro}</p>;
    }

    return (
        <div>
            <h2>Produtos</h2>
            <ul>
                {produtos.map(produto => (
                    <li key={produto.id}>
                        {produto.nome} - R$ {produto.preco} - Estoque: {produto.quantidadeEmEstoque}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProdutoList;
