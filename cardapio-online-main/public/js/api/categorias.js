// public/js/api/categoriasApi.js

// URL base para a API de categorias
const apiUrl = 'http://localhost:3000/api/categorias';

// Função para obter a lista de categorias
async function obterCategorias() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Erro ao obter categorias');
        const categorias = await response.json();
        return categorias;
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao carregar categorias');
    }
}

// Função para adicionar uma nova categoria
async function adicionarCategoria(nome) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome })
        });
        if (!response.ok) throw new Error('Erro ao adicionar categoria');
        const categoria = await response.json();
        return categoria;
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao adicionar categoria');
    }
}

// Função para editar uma categoria existente
async function editarCategoria(id, nome) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome })
        });
        if (!response.ok) throw new Error('Erro ao editar categoria');
        const categoria = await response.json();
        return categoria;
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao editar categoria');
    }
}

// Função para deletar uma categoria
async function deletarCategoria(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erro ao deletar categoria');
        const resultado = await response.json();
        return resultado;
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar categoria');
    }
}

export function carregarCategorias() {
    fetch('http://localhost:3000/categorias')
        .then(response => {
            console.log('Status da resposta:', response.status);
            if (!response.ok) {
                throw new Error(`Erro ao carregar categorias: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data);
            const categoriaSelect = document.getElementById('m-categoria');
            if (!categoriaSelect) {
                throw new Error("Elemento 'm-categoria' não foi encontrado.");
            }
            categoriaSelect.innerHTML = '';
            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.nome;
                categoriaSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar categorias:', error);
        });
}
