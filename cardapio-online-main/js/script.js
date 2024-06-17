const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
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
    sNome.value = itens[crud].nome
    sFuncao.value = itens[crud].funcao
    sSalario.value = itens[crud].salario
    id = crud
  } else {
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
  }
  
}

function editItem(crud) {

  openModal(true, crud)
}

function deleteItem(crud) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, crud) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
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
  
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
  } else {
    itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
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

function validateLogin(event) {
    // Impede o comportamento padrão de envio do formulário
    event.preventDefault();

    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    // Verifica se o e-mail e a senha correspondem ao conjunto específico
    if (email === 'teste@gmail.com' && password === '0210') {
        // Fecha o modal de login
        $('#modalLogin').modal('hide');

        // Redireciona para a página crud.html
        window.location.href = "crud.html";
    } else {
        alert('E-mail ou senha incorretos. Por favor, tente novamente.');
    }

    // Impede o envio do formulário
    return false;
}

// Seleciona o elemento de formulário
var form = document.getElementById('loginForm');

// Adiciona um listener para o evento de submit
form.addEventListener('submit', validateLogin);

loadItens()