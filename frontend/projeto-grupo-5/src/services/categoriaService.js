const API_URL_CATEGORIAS = 'http://localhost:8080/categorias';

export const getCategorias = async () => {
    try {
        const response = await fetch(API_URL_CATEGORIAS);
        if (!response.ok) {
            throw new Error(`Erro ao buscar categorias: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        throw error;
    }
};

export const createCategoria = async (categoria) => {
    try {
        const response = await fetch(API_URL_CATEGORIAS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoria),
        });
        if (!response.ok) {
            throw new Error(`Erro ao criar categoria: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        throw error;
    }
};

export const updateCategoria = async (id, categoria) => {
    try {
        const response = await fetch(`${API_URL_CATEGORIAS}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoria),
        });
        if (!response.ok) {
            throw new Error(`Erro ao atualizar categoria: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        throw error;
    }
};

export const deleteCategoria = async (id) => {
    try {
        const response = await fetch(`${API_URL_CATEGORIAS}/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error(`Erro ao deletar categoria: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        throw error;
    }
};
