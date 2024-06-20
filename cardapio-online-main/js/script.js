const apiUrl = 'http://localhost:3000/produtos';
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sCategoria = document.querySelector('#m-categoria');
const sPreco = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');

let itens = [];
let id;

// Abrir modal para adicionar ou editar produto
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

// Fechar modal
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
      sCategoria.innerHTML = '';
      data.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.nome;
        option.textContent = categoria.nome;
        sCategoria.appendChild(option);
      });
    });
}

// Listar produtos na tabela
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

// Salvar um produto (inserir ou atualizar)
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
    })
    .catch(error => {
      console.error('Erro ao editar produto:', error);
      alert('Erro ao editar produto. Verifique o console para mais detalhes.');
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
    })
    .catch(error => {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto. Verifique o console para mais detalhes.');
    });
  }
};

// Deletar um produto
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

// Editar um produto
function editarProduto(index) {
  id = index;
  openModal(true, index);
}

// Carregar categorias e produtos ao inicializar a página
document.addEventListener('DOMContentLoaded', function() {
  carregarCategorias();
  listarProdutos();
});

// Selecionar imagem para visualização antes de enviar
document.getElementById('chooseImageButton').addEventListener('click', function() {
  document.getElementById('fileInput').click();
});

// Exibir imagem selecionada
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