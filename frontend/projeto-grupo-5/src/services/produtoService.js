const API_URL_PRODUTOS = 'http://localhost:8080/produtos';

export const getProdutos = async () => {
    try {
        const response = await fetch(API_URL_PRODUTOS);
        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
};

export const createProduto = async (produto) => {
    try {
        const response = await fetch(API_URL_PRODUTOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        });
        if (!response.ok) {
            throw new Error(`Erro ao criar produto: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        throw error;
    }
};

export const updateProduto = async (id, produto) => {
    try {
        const response = await fetch(`${API_URL_PRODUTOS}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        });
        if (!response.ok) {
            throw new Error(`Erro ao atualizar produto: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        throw error;
    }
};

export const deleteProduto = async (id) => {
    try {
        const response = await fetch(`${API_URL_PRODUTOS}/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error(`Erro ao deletar produto: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        throw error;
    }
};
