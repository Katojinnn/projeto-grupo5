const API_URL = "https://poisonous-spooky-spirit-wr7xjgv9q54rhv47j-8080.app.github.dev";

export const fetchCategorias = async () => {
  const response = await fetch(`${API_URL}/categorias`);
  const data = await response.json();
  return data;
};

export const fetchProdutos = async () => {
  const response = await fetch(`${API_URL}/produtos`);
  const data = await response.json();
  return data;
};

export const createProduto = async (produto) => {
  const response = await fetch(`${API_URL}/produtos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(produto),
  });
  const data = await response.json();
  return data;
};
export const deleteProduto = async (id) => {
  const response = await fetch(`/api/produtos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error("Falha ao excluir o produto");
  }
};
