const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCategoria = document.querySelector('#m-categoria')
const sPreco = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, crud = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[cru].nome
    sFuncao.value = itens[crud].funcao
    sPreco.value = itens[crud].preco
    sImagem.value = itens[crud].imagem
    id = crud
  } else {
    sNome.value = ''
    sCategoria.value = ''
    sPreco.value = ''
    sImagem.value = ''
  }
  
}

function editItem(crud) {

  openModal(true, crud)
}

function deleteItem(crud) {
  itens.splice(crud, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, crud) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.categoria}</td>
    <td>R$ ${item.preco}</td>
    <td>${item.imagem}</td>
    <td class="acao">
      <button onclick="editItem(${crud})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${crud})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sCategoria.value == '' || sPreco.value == '' || sImagem.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].categoria = sCategoria.value
    itens[id].preco = sPreco.value
    itens[id].imagem = sImagem.value
  } else {
    itens.push({'nome': sNome.value, 'categoria': sCategoria.value, 'salario': sPreco.value, 'imagem': sImagem.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, crud) => {
    insertItem(item, crud)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()


// Exemplo de adicionar um novo item à tabela após inclusão
function adicionarNaTabela(nome, categoria, preco,imagem) {
  let tbody = document.querySelector('.divTable table tbody');
  let newRow = `<tr>
                  <td>${nome}</td>
                  <td>${categoria}</td>
                  <td>${preco}</td>
                  <td>${imagem}</td>
                  <td class="acao">Editar</td>
                  <td class="acao">Excluir</td>
                </tr>`;
  tbody.innerHTML += newRow;
}

// Exemplo de chamada após salvar um novo item
btnSalvar.addEventListener('click', function(event) {
  event.preventDefault();
  let nome = document.getElementById('m-nome').value;
  let categoria = document.getElementById('m-categoria').value;
  let preco = document.getElementById('m-salario').value;
  let imagem = document.getElementById('m-imagem').value;

  // Chame sua função de criar novo produto aqui, e então adicione à tabela
  createProduct(categoria, { "name": nome, "category": categoria, "price": preco, "imagem":imagem });

  // Limpe os campos do formulário modal
  document.getElementById('m-nome').value = '';
  document.getElementById('m-categoria').value = '';
  document.getElementById('m-salario').value = '';
  document.getElementById('m-imagem').value = '';

  // Adicione à tabela
  adicionarNaTabela(nome, categoria, preco, imagem);
});
