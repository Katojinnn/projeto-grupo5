import React, { useEffect, useState } from 'react';

const CategoriaList = () => {
    const [categorias, setCategorias] = useState([]);
    const [erro, setErro] = useState(null); // Para armazenar erro

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://localhost:8080/categorias');
                
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
                setErro(error.message);  // Salva a mensagem de erro
            }
        };

        fetchCategorias();
    }, []);

    if (erro) {
        return <p>{erro}</p>;
    }

    return (
        <div>
            <h2>Categorias</h2>
            <ul>
                {categorias.map(categoria => (
                    <li key={categoria.id}>{categoria.nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriaList;
