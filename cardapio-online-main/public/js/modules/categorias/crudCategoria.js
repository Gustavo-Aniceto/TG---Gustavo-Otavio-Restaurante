// public/js/modules/crudCategorias.js

const apiUrlCategorias = 'http://localhost:3000/api/categoriasApi.js'; // URL da API
const modalCategoria = document.querySelector('#modal-categoria');
const categoriaNome = document.querySelector('#categoria-nome');
const btnSalvarCategoria = document.querySelector('#btnSalvarCategoria');

// Abrir modal para adicionar nova categoria
function openModalCategoria() {
    modalCategoria.style.display = 'block';
    modalCategoria.onclick = e => {
        if (e.target === modalCategoria) {
            fecharModal('modal-categoria');
        }
    };
}

// Fechar modal
function fecharModal(modalId) {
    document.querySelector(`#${modalId}`).style.display = 'none';
    if (modalId === 'modal-categoria') {
        document.getElementById('categoriaForm').reset();
    }
}

// Salvar uma nova categoria ou atualizar uma existente
btnSalvarCategoria.onclick = e => {
    e.preventDefault();

    const nomeCategoria = categoriaNome.value;
    if (nomeCategoria === '') {
        alert('Por favor, preencha o nome da categoria.');
        return;
    }

    const idCategoria = btnSalvarCategoria.dataset.id; // Verifica se estamos editando

    const fetchOptions = {
        method: idCategoria ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nomeCategoria })
    };

    fetch(idCategoria ? `${apiUrlCategorias}/${idCategoria}` : apiUrlCategorias, fetchOptions)
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Categoria salva com sucesso!');
            fecharModal('modal-categoria');
            listarCategorias();
        })
        .catch(error => {
            console.error('Erro ao salvar categoria:', error);
            alert('Erro ao salvar categoria. Verifique o console para mais detalhes.');
        });
};

// Carregar categorias para dropdown
function carregarCategorias() {
    fetch(apiUrlCategorias)
        .then(response => response.json())
        .then(categorias => {
            const selectCategoria = document.getElementById('m-categoria');
            selectCategoria.innerHTML = ''; // Limpa o dropdown

            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.nome;
                selectCategoria.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar categorias:', error));
}

// Listar categorias na tabela
function listarCategorias() {
    fetch(apiUrlCategorias)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('categorias-tbody');
            tbody.innerHTML = ''; // Limpa a tabela
            data.forEach(categoria => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${categoria.nome}</td>
                    <td>
                        <button onclick="editarCategoria(${categoria.id}, '${categoria.nome}')">Editar</button>
                        <button onclick="deletarCategoria(${categoria.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao listar categorias:', error);
        });
}

// Editar uma categoria existente
function editarCategoria(id, nomeAtual) {
    const modal = document.getElementById('modal-categoria');
    modal.style.display = 'block';
    categoriaNome.value = nomeAtual;

    btnSalvarCategoria.dataset.id = id; // Armazena o ID da categoria a ser editada
}

// Excluir uma categoria
function deletarCategoria(id) {
    if (confirm('Tem certeza de que deseja excluir esta categoria?')) {
        fetch(`${apiUrlCategorias}/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            alert('Categoria excluída com sucesso!');
            listarCategorias(); // Atualizar a lista de categorias
        })
        .catch(error => {
            console.error('Erro ao excluir categoria:', error);
            alert('Erro ao excluir categoria. Verifique o console para mais detalhes.');
        });
    }
}

// Inicializar funções
document.addEventListener('DOMContentLoaded', () => {
    listarCategorias();
    carregarCategorias();
});
