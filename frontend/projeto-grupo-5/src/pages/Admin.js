import React, { useState, useEffect } from 'react';

function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: '', descricao: '', preco: '', estoque: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/produtos`)
      .then(response => response.json())
      .then(data => {
        console.log("Produtos carregados:", data);
        setProdutos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao carregar produtos:", error);
        setLoading(false);
      });
  }, []);

  const handleCriarProduto = () => {
    fetch(`${process.env.REACT_APP_API_URL}/produtos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoProduto),
    })
      .then(response => response.json())
      .then(data => {
        setProdutos([...produtos, data]);
        setNovoProduto({ nome: '', descricao: '', preco: '', estoque: '' });
      })
      .catch(error => console.error("Erro ao criar produto:", error));
  };

  const handleDeletarProduto = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/produtos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProdutos(produtos.filter(produto => produto.id !== id));
      })
      .catch(error => console.error("Erro ao deletar produto:", error));
  };

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <div className="admin-page">
      <h1>Admin - Gerenciar Produtos</h1>

      <div className="create-product">
        <h2>Criar Novo Produto</h2>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={novoProduto.nome}
          onChange={e => setNovoProduto({ ...novoProduto, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={novoProduto.descricao}
          onChange={e => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço"
          value={novoProduto.preco}
          onChange={e => setNovoProduto({ ...novoProduto, preco: e.target.value })}
        />
        <input
          type="number"
          placeholder="Estoque"
          value={novoProduto.estoque}
          onChange={e => setNovoProduto({ ...novoProduto, estoque: e.target.value })}
        />
        <button onClick={handleCriarProduto}>Criar Produto</button>
      </div>

      <div className="product-list">
        <h2>Produtos Existentes</h2>
        <ul>
          {produtos.length === 0 ? (
            <p>Nenhum produto encontrado.</p>
          ) : (
            produtos.map(produto => (
              <li key={produto.id} className="product-item">
                <p>{produto.nome} - R$ {produto.preco.toFixed(2)}</p>
                <button onClick={() => handleDeletarProduto(produto.id)}>Deletar</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
