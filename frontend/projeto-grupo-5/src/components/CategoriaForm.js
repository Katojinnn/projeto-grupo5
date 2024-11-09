import React, { useState } from 'react';

const CategoriaForm = ({ categoriaInicial, onSave }) => {
    const [nome, setNome] = useState(categoriaInicial ? categoriaInicial.nome : '');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const categoria = { nome };

        try {
            if (categoriaInicial) {
                await updateCategoria(categoriaInicial.id, categoria);
                alert('Categoria atualizada com sucesso!');
            } else {
                await createCategoria(categoria);
                alert('Categoria criada com sucesso!');
            }
            onSave();
        } catch (error) {
            console.error('Erro ao salvar categoria:', error);
            alert('Erro ao salvar a categoria');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                placeholder="Nome da Categoria" 
                required 
            />
            <button type="submit">Salvar</button>
        </form>
    );
};

export default CategoriaForm;
