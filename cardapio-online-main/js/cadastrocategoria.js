const apiUrlCategorias = 'http://localhost:3000/categorias';
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

// Salvar uma nova categoria
btnSalvarCategoria.onclick = e => {
    e.preventDefault();

    if (categoriaNome.value === '') {
        alert('Por favor, preencha o nome da categoria.');
        return;
    }

    fetch(apiUrlCategorias, {
        method: 'POST',
        body: JSON.stringify({ nome: categoriaNome.value }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        carregarCategorias();
        fecharModal('modal-categoria');
    })
    .catch(error => {
        console.error('Erro ao adicionar categoria:', error);
        alert('Erro ao adicionar categoria. Verifique o console para mais detalhes.');
    });
};

function salvarCategoria() {
    const nomeCategoria = document.getElementById('categoria-nome').value;

    fetch('http://localhost:3000/api/categorias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: nomeCategoria }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Categoria salva com sucesso!');
        fecharModal('modal-categoria');
        carregarCategorias(); // Atualizar o dropdown com as novas categorias
    })
    .catch(error => {
        console.error('Erro ao salvar categoria:', error);
        alert('Erro ao salvar categoria. Verifique o console para mais detalhes.');
    });
}
function carregarCategorias() {
    fetch('getCategorias.php')
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


function listarCategorias() {
    fetch('http://localhost:3000/api/categorias')
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
function editarCategoria(id, nomeAtual) {
    const modal = document.getElementById('modal-categoria');
    modal.style.display = 'block';
    document.getElementById('categoria-nome').value = nomeAtual;

    document.getElementById('btnSalvarCategoria').onclick = function() {
        const novoNome = document.getElementById('categoria-nome').value;
        fetch(`http://localhost:3000/api/categorias/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome: novoNome }),
        })
        .then(response => response.json())
        .then(data => {
            alert('Categoria atualizada com sucesso!');
            fecharModal('modal-categoria');
            listarCategorias(); // Atualizar a lista de categorias
        })
        .catch(error => {
            console.error('Erro ao atualizar categoria:', error);
            alert('Erro ao atualizar categoria. Verifique o console para mais detalhes.');
        });
    };
}
function deletarCategoria(id) {
    if (confirm('Tem certeza de que deseja excluir esta categoria?')) {
        fetch(`http://localhost:3000/api/categorias/${id}`, {
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
