// public/js/api/produtosApi.js

const apiUrl = 'http://localhost:3000/produtos';

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

// Função para carregar produtos por categoria
function carregarCategoriasEProdutos() {
    axios.get('/api/categorias')
        .then(response => {
            const categorias = response.data;
            categorias.forEach(categoria => {
                const categoriaHtml = `
                    <div class="categoria" id="${categoria.nome.toLowerCase()}">
                        <h2>${categoria.nome}</h2>
                        <div class="row" id="itensCardapio-${categoria.nome.toLowerCase()}"></div>
                    </div>
                `;
                $('.cardapio .container').append(categoriaHtml);

                carregarProdutosPorCategoria(categoria.id, categoria.nome.toLowerCase());
            });
        })
        .catch(error => {
            console.error('Erro ao carregar categorias:', error);
        });
}

// Função para carregar produtos de uma categoria específica
function carregarProdutosPorCategoria(categoriaId, categoriaNome) {
    axios.get(`/api/produtos/categoria/${categoriaId}`)
        .then(response => {
            const produtos = response.data;
            const produtosContainer = $(`#itensCardapio-${categoriaNome}`);
            produtos.forEach(produto => {
                const produtoHtml = `
                    <div class="col-12 col-md-4">
                        <div class="produto-card">
                            <img src="${produto.imagem}" alt="${produto.nome}">
                            <div class="produto-card-body">
                                <h5 class="produto-card-title">${produto.nome}</h5>
                                <p class="produto-card-price">R$ ${produto.preco.toFixed(2)}</p>
                                <div class="produto-quantidade">
                                    <button onclick="alterarQuantidade('${produto.id}', 'diminuir')">-</button>
                                    <input type="text" id="quantidade-${produto.id}" value="1" readonly>
                                    <button onclick="alterarQuantidade('${produto.id}', 'aumentar')">+</button>
                                </div>
                                <button onclick="adicionarAoCarrinho('${produto.id}')" class="btn btn-adicionar">Adicionar ao Carrinho</button>
                            </div>
                        </div>
                    </div>
                `;
                produtosContainer.append(produtoHtml);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar produtos:', error);
        });
}


// Funções adicionais para alterar quantidade e adicionar ao carrinho
function alterarQuantidade(produtoId, operacao) {
    const quantidadeInput = document.getElementById(`quantidade-${produtoId}`);
    let quantidade = parseInt(quantidadeInput.value);

    if (operacao === 'aumentar') {
        quantidade++;
    } else if (operacao === 'diminuir' && quantidade > 1) {
        quantidade--;
    }

    quantidadeInput.value = quantidade;
}

function adicionarAoCarrinho(produtoId) {
    const quantidade = parseInt(document.getElementById(`quantidade-${produtoId}`).value);
    console.log(`Produto ${produtoId} adicionado ao carrinho com quantidade ${quantidade}`);
    // Adicione aqui a lógica de adicionar ao carrinho
}

// Chama a função para carregar categorias e produtos quando a página for carregada
$(document).ready(function() {
    carregarCategoriasEProdutos();
});


// Exportando as funções para uso em outros módulos
export { listarProdutos, adicionarProduto, editarProduto, deletarProduto };
