const apiUrl = 'http://localhost:3000/produtos';
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sCategoria = document.querySelector('#m-categoria');
const sPreco = document.querySelector('#m-preco');
const btnSalvar = document.querySelector('#btnSalvar');


let itens = [];
let id; // ID do produto a ser editado

// Abrir modal para adicionar ou editar produto
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

  carregarCategorias();
}

// Fechar modal
function fecharModal() {
  modal.style.display = 'none';
  document.getElementById('produtoForm').reset();
  document.getElementById('previewImage').style.display = 'none';
  id = undefined;
}

// Função para carregar categorias dinamicamente do servidor
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
    })
    .catch(error => {
      console.error('Erro ao carregar categorias:', error);
    });
}

// Função para listar produtos
function listarProdutos() {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Dados recebidos:', data);
      const tbody = document.getElementById('produtos-tbody');
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
    })
    .catch(error => {
      console.error('Erro ao listar produtos:', error);
    });
}

// Função para adicionar a tabela ao DOM e listar produtos
function mostrarProdutos() {
  const produtosList = document.getElementById('produtos-list');
  produtosList.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Preço</th>
          <th>Imagem</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody id="produtos-tbody"></tbody>
    </table>
  `;

  // Listar produtos
  listarProdutos();
}

// Função para editar um produto
function editarProduto(index) {
  openModal(true, index);
}

// Salvar um produto (inserir ou atualizar)
btnSalvar.onclick = e => {
  e.preventDefault();

  if (sNome.value === '' || sCategoria.value === '' || sPreco.value === '') {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const formData = new FormData(document.getElementById('produtoForm'));

  if (id !== undefined) {
    // Editar produto existente
    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        nome: sNome.value,
        categoria: sCategoria.value,
        preco: sPreco.value,
        imagem: formData.get('imagem') ? formData.get('imagem') : '' // Adapte conforme necessário
      }),
      headers: {
        'Content-Type': 'application/json'
      }
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

// Função para deletar um produto
function deletarProduto(produtoId) {
  if (confirm('Tem certeza de que deseja excluir este produto?')) {
    fetch(`${apiUrl}/${produtoId}`, {
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
}

// Carregar categorias e produtos ao inicializar a página
document.addEventListener('DOMContentLoaded', function() {
  carregarCategorias();
});
