// public/js/api/produtosApi.js

const apiUrl = '://localhohttpst:3000/produtos';

// Função para listar todos os produtos
async function listarProdutos() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        throw error;
    }
}

// Função para adicionar um novo produto
async function adicionarProduto(produtoData) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: produtoData, // Deve ser um FormData se incluir arquivo
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        throw error;
    }
}

// Função para editar um produto existente
async function editarProduto(id, produtoData) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            body: produtoData, // Deve ser um FormData se incluir arquivo
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao editar produto:', error);
        throw error;
    }
}

// Função para deletar um produto
async function deletarProduto(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        throw error;
    }
}

// Exportando as funções para uso em outros módulos
export { listarProdutos, adicionarProduto, editarProduto, deletarProduto };
