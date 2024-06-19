const apiUrl = 'http://localhost:3000/produtos';
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sCategoria = document.querySelector('#m-categoria');
const sPreco = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');

let itens = [];
let id;

// Função para abrir o modal
function openModal(edit = false, crud = 0) {
  modal.style.display = 'block';

  // Fechar modal clicando fora da área do modal
  modal.onclick = e => {
    if (e.target === modal) {
      fecharModal();
    }
  };

  // Preencher campos se estiver editando
  if (edit) {
    sNome.value = itens[crud].nome;
    sCategoria.value = itens[crud].categoria;
    sPreco.value = itens[crud].preco;
    // Implemente a lógica para preencher a imagem, se necessário
    id = crud;
  } else {
    sNome.value = '';
    sCategoria.value = '';
    sPreco.value = '';
    // Implemente a lógica para limpar a imagem, se necessário
    id = undefined;
  }
  
  carregarCategorias();
}

// Função para fechar o modal
function fecharModal() {
  modal.style.display = 'none';
  document.getElementById('produtoForm').reset();
  document.getElementById('previewImage').style.display = 'none';
  id = undefined;
}

// Carregar categorias dinamicamente do servidor
function carregarCategorias() {
  fetch('http://localhost:3000/categorias')
    .then(response => response.json())
    .then(data => {
      sCategoria.innerHTML = ''; // Limpa as opções existentes
      data.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.nome;
        option.textContent = categoria.nome;
        sCategoria.appendChild(option);
      });
    });
}

// Função para listar produtos na tabela
function listarProdutos() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      tbody.innerHTML = ''; // Limpa o conteúdo da tabela
      itens = data; // Atualiza a lista de itens
      data.forEach((produto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${produto.nome}</td>
          <td>${produto.categoria}</td>
          <td>${produto.preco}</td>
          <td>${produto.imagem ? `<img src="http://localhost:3000/${produto.imagem}" width="100">` : 'Nenhuma imagem'}</td>
          <td class="acao"><button onclick="editarProduto(${index})">Editar</button></td>
          <td class="acao"><button onclick="deletarProduto(${produto.id})">Excluir</button></td>
        `;
        tbody.appendChild(row);
      });
    });
}

// Função para salvar um produto
btnSalvar.onclick = e => {
  e.preventDefault();

  if (sNome.value === '' || sCategoria.value === '' || sPreco.value === '') {
    return;
  }

  const formData = new FormData(document.getElementById('produtoForm'));

  if (id !== undefined) {
    // Editar produto existente
    fetch(`${apiUrl}/${itens[id].id}`, {
      method: 'PUT',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      listarProdutos();
      fecharModal();
    });
  } else {
    // Adicionar novo produto
    fetch(apiUrl, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      listarProdutos();
      fecharModal();
    });
  }
};

// Função para deletar um produto
function deletarProduto(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    listarProdutos();
  });
}

// Função para editar um produto
function editarProduto(index) {
  id = index;
  openModal(true, index);
}

// Carregar categorias ao inicializar a página
carregarCategorias();

// Carregar produtos ao inicializar a página
listarProdutos();
