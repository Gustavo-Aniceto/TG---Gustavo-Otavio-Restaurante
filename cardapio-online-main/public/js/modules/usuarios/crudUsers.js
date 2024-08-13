// public/js/modules/crudUsers.js

document.addEventListener('DOMContentLoaded', () => {
    carregarUsuarios(); // Carrega a lista de usuários ao carregar a página
});

const apiUrl = 'http://localhost:3000/api/usuarios'; // Certifique-se de usar a URL correta

/**
 * Carrega e exibe a lista de usuários.
 */
function carregarUsuarios() {
    const tbody = document.getElementById('usuarios-tbody');
    tbody.innerHTML = ''; // Limpar conteúdo existente

    // Fazer requisição para o backend para obter os usuários
    fetch(apiUrl)
        .then(response => response.json())
        .then(usuarios => {
            usuarios.forEach(usuario => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${usuario.nome}</td>
                    <td>
                        <button class="btn-yellow" onclick="editarUsuario('${usuario.id}')">Editar</button>
                        <button class="btn-yellow" onclick="excluirUsuario('${usuario.id}')">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar usuários:', error);
        });
}

/**
 * Salva um novo usuário ou atualiza um usuário existente.
 */
function salvarUsuario() {
    const nomeUsuario = document.getElementById('usuario-nome').value;
    const senhaUsuario = document.getElementById('usuario-senha').value;
    const usuarioId = document.getElementById('usuario-id')?.value; // Para edição de usuário

    // Dados a serem enviados para o backend
    const dados = {
        nome: nomeUsuario,
        senha: senhaUsuario
    };

    const method = usuarioId ? 'PUT' : 'POST'; // Se existe ID, é uma atualização
    const url = usuarioId ? `${apiUrl}/${usuarioId}` : apiUrl;

    // Fazer requisição para salvar ou atualizar o usuário
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fecharModal('modal-usuario');
            carregarUsuarios(); // Recarregar a lista de usuários após salvar
        } else {
            console.error('Erro ao salvar usuário:', data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao salvar usuário:', error);
    });
}

// Associar a função ao formulário do modal
document.getElementById('usuarioForm').onsubmit = function (e) {
    e.preventDefault();
    salvarUsuario();
};

/**
 * Abre o modal para edição de um usuário.
 * @param {string} usuarioId - O ID do usuário a ser editado.
 */
function editarUsuario(usuarioId) {
    // Fazer uma requisição para obter os detalhes do usuário
    fetch(`${apiUrl}/${usuarioId}`)
        .then(response => response.json())
        .then(usuario => {
            document.getElementById('usuario-nome').value = usuario.nome;
            document.getElementById('usuario-senha').value = ''; // Senha não deve ser pré-preenchida
            document.getElementById('usuario-id').value = usuario.id;
            document.getElementById('modal-usuario').style.display = 'block';
        })
        .catch(error => {
            console.error('Erro ao carregar usuário para edição:', error);
        });
}

/**
 * Exclui um usuário.
 * @param {string} usuarioId - O ID do usuário a ser excluído.
 */
function excluirUsuario(usuarioId) {
    if (confirm('Tem certeza de que deseja excluir este usuário?')) {
        fetch(`${apiUrl}/${usuarioId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                carregarUsuarios(); // Recarregar a lista de usuários após exclusão
            } else {
                console.error('Erro ao excluir usuário:', data.message);
            }
        })
        .catch(error => {
            console.error('Erro ao excluir usuário:', error);
        });
    }
}

/**
 * Fecha o modal.
 * @param {string} modalId - O ID do modal a ser fechado.
 */
function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.getElementById('usuarioForm').reset(); // Limpar o formulário
    document.getElementById('usuario-id')?.value = ''; // Limpar o ID do usuário
}
