document.addEventListener('DOMContentLoaded', () => {
    listarProdutos(); // Carrega os produtos ao carregar a página
    carregarCategorias(); // Carrega as categorias disponíveis para seleção no modal
});

const apiUrl = 'http://localhost:3000/api/produtos';
const apiUrlCategorias = 'http://localhost:3000/api/categorias';
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sCategoria = document.querySelector('#m-categoria');
const sPreco = document.querySelector('#m-preco');
const btnSalvar = document.querySelector('#btnSalvar');

let itens = [];
let id; // ID do produto a ser editado

// Função para abrir o modal (para adicionar ou editar)
function openModal(edit = false, index = undefined) {
    modal.style.display = 'block';
    modal.onclick = e => {
        if (e.target === modal) {
            fecharModal();
        }
    };

    if (edit && index !== undefined) {
        // Preencher o modal com os dados do produto para edição
        sNome.value = itens[index].nome;
        sCategoria.value = itens[index].categoria;
        sPreco.value = itens[index].preco;
        id = itens[index].id; // Atualiza o ID do produto

        // Exibir a imagem existente se houver
        if (itens[index].imagem) {
            const previewImage = document.getElementById('previewImage');
            previewImage.src = `http://localhost:3000/${itens[index].imagem}`;
            previewImage.style.display = 'block';
        }
    } else {
        // Limpar o modal para novo produto
        sNome.value = '';
        sCategoria.value = '';
        sPreco.value = '';
        id = undefined;
        document.getElementById('previewImage').style.display = 'none';
    }
}

// Função para fechar o modal
function fecharModal() {
    modal.style.display = 'none';
    document.getElementById('produtoForm').reset();
    document.getElementById('previewImage').style.display = 'none';
    id = undefined;
}

// Função para carregar categorias dinamicamente do servidor
function carregarCategorias() {
    fetch(apiUrlCategorias)
        .then(response => response.json())
        .then(data => {
            sCategoria.innerHTML = '';
            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.nome;
                option.textContent = categoria.nome;
                sCategoria.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar categorias:', error);
        });
}

// Função para listar produtos
function listarProdutos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Limpa as seções antes de adicionar novos produtos
            document.getElementById('itensCardapio-burgers').innerHTML = '';
            document.getElementById('itensCardapio-pizzas').innerHTML = '';
            document.getElementById('itensCardapio-bebidas').innerHTML = '';
            // Adicione outras seções de categorias aqui conforme necessário

            itens = data;
            data.forEach((produto, index) => {
                const produtoHtml = `
                    <div class="col-12 col-lg-4 col-md-6 mb-4">
                        <div class="card">
                            <img src="http://localhost:3000/${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                            <div class="card-body">
                                <h5 class="card-title">${produto.nome}</h5>
                                <p class="card-text">${produto.categoria}</p>
                                <p class="card-text">R$${produto.preco.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                `;

                // Inserir o produto na seção correspondente com base na categoria
                switch (produto.categoria.toLowerCase()) {
                    case 'burgers':
                        document.getElementById('itensCardapio-burgers').innerHTML += produtoHtml;
                        break;
                    case 'pizzas':
                        document.getElementById('itensCardapio-pizzas').innerHTML += produtoHtml;
                        break;
                    case 'bebidas':
                        document.getElementById('itensCardapio-bebidas').innerHTML += produtoHtml;
                        break;
                    // Adicione mais casos conforme as categorias existentes
                    default:
                        console.warn(`Categoria não reconhecida: ${produto.categoria}`);
                        break;
                }
            });
        })
        .catch(error => {
            console.error('Erro ao listar produtos:', error);
        });
}

// Função para deletar um produto
function deletarProduto(produtoId) {
    if (confirm('Tem certeza de que deseja excluir este produto?')) {
        fetch(`${apiUrl}/${produtoId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Produto excluído com sucesso!');
            listarProdutos();
        })
        .catch(error => {
            console.error('Erro ao deletar produto:', error);
            alert('Erro ao deletar produto. Verifique o console para mais detalhes.');
        });
    }
}
