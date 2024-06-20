const apiUrl = 'http://localhost:3000/produtos';
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sCategoria = document.querySelector('#m-categoria');
const sPreco = document.querySelector('#m-preco');

let itens = [];
let id;

// Function to open modal for adding or editing a product
function openModal(edit = false, crud = 0) {
  modal.style.display = 'block';
  modal.onclick = e => {
    if (e.target === modal) {
      fecharModal();
    }
  };

  if (edit) {
    sNome.value = itens[crud].nome;
    sCategoria.value = itens[crud].categoria;
    sPreco.value = itens[crud].preco;
    id = crud;
  } else {
    sNome.value = '';
    sCategoria.value = '';
    sPreco.value = '';
    id = undefined;
  }

  carregarCategorias();
}

// Function to close modal
function fecharModal() {
  modal.style.display = 'none';
  document.getElementById('produtoForm').reset();
  document.getElementById('previewImage').style.display = 'none';
  id = undefined;
}

// Function to dynamically load categories from the server
function carregarCategorias() {
  fetch('http://localhost:3000/categorias')
    .then(response => response.json())
    .then(data => {
      sCategoria.innerHTML = '';
      data.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.nome;
        option.textContent = categoria.nome;
        sCategoria.appendChild(option);
      });
    });
}

// Function to list products in the table
function listarProdutos() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      tbody.innerHTML = '';
      itens = data;
      data.forEach((produto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${produto.nome}</td>
          <td>${produto.categoria}</td>
          <td>${produto.preco}</td>
          <td>${produto.imagem ? `<img src="http://localhost:3000/${produto.imagem}" width="100">` : 'Nenhuma imagem'}</td>
          <td><button onclick="editarProduto(${index})">Editar</button></td>
          <td><button onclick="deletarProduto(${produto.id})">Excluir</button></td>
        `;
        tbody.appendChild(row);
      });
    });
}

// Function to save a product (insert or update)
function salvarProduto() {
        const formData = new FormData(document.getElementById('produtoForm'));
      
        if (id !== undefined) {
          // Editing existing product
          fetch(`${apiUrl}/${itens[id].id}`, {
            method: 'PUT',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            alert(data.message);
            listarProdutos();
            fecharModal();
            id = undefined; // Reset id after editing
          })
          .catch(error => {
            console.error('Erro ao editar produto:', error);
            alert('Erro ao editar produto. Verifique o console para mais detalhes.');
          });
        } else {
          // Adding new product
          fetch(apiUrl, {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            alert(data.message);
            listarProdutos();
            fecharModal();
            id = undefined; // Reset id after adding
          })
          .catch(error => {
            console.error('Erro ao adicionar produto:', error);
            alert('Erro ao adicionar produto. Verifique o console para mais detalhes.');
          });
  }
}

// Function to delete a product
function deletarProduto(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    listarProdutos();
  })
  .catch(error => {
    console.error('Erro ao deletar produto:', error);
    alert('Erro ao deletar produto. Verifique o console para mais detalhes.');
  });
}

// Function to edit a product
function editarProduto(index) {
  id = index;
  openModal(true, index);
}

// Function to initialize categories and products when the page loads
document.addEventListener('DOMContentLoaded', function() {
  carregarCategorias();
  listarProdutos();
});

// Event listener to select an image for preview before submission
document.getElementById('chooseImageButton').addEventListener('click', function() {
  document.getElementById('fileInput').click();
});

// Event listener to display selected image
document.getElementById('fileInput').addEventListener('change', function(event) {
  const previewImage = document.getElementById('previewImage');
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    previewImage.src = e.target.result;
    previewImage.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

// Event listener for the save button
document.getElementById('btnSalvar').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Call the saveProduct function when the button is clicked
    salvarProduto();
  });

function listarProdutosPorCategoria(categoria) {
    fetch(apiUrl)  // Assumindo que apiUrl é a URL da sua API que retorna todos os produtos
        .then(response => response.json())
        .then(data => {
            const produtosPorCategoria = data.filter(produto => produto.categoria === categoria);
            const containerCategoria = document.getElementById(`itensCardapio-${categoria}`);
            containerCategoria.innerHTML = '';  // Limpa o conteúdo atual

            produtosPorCategoria.forEach(produto => {
                const cardProduto = `
                    <div class="col-4 col-md-3">
                        <div class="card">
                            <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                            <div class="card-body">
                                <h5 class="card-title">${produto.nome}</h5>
                                <p class="card-text">${produto.descricao}</p>
                                <p class="card-text">Preço: R$ ${produto.preco.toFixed(2)}</p>
                                <a href="#" class="btn btn-primary">Adicionar ao Carrinho</a>
                            </div>
                        </div>
                    </div>
                `;
                containerCategoria.innerHTML += cardProduto;
            });
        })
        .catch(error => {
            console.error('Erro ao obter produtos por categoria:', error);
        });
}

// Função para carregar todos os produtos ao iniciar a página
document.addEventListener('DOMContentLoaded', function() {
    listarProdutosPorCategoria('burgers');
    listarProdutosPorCategoria('pizzas');
    listarProdutosPorCategoria('churrasco');
    listarProdutosPorCategoria('steaks');
    listarProdutosPorCategoria('bebidas');
    listarProdutosPorCategoria('sobremesas');
});