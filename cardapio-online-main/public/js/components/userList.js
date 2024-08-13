// public/js/components/userList.js

import { getUsers } from '../api/usersApi.js';

/**
 * Exibe a lista de usuários na página.
 */
export async function displayUserList() {
    try {
        const users = await getUsers();
        const userListContainer = document.getElementById('userList');

        userListContainer.innerHTML = users.map(user => `
            <div class="user-item">
                <p>Usuário: ${user.username}</p>
                <p>Senha: ${user.password}</p>
                <button onclick="editUser(${user.id})">Editar</button>
                <button onclick="deleteUser(${user.id})">Excluir</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao exibir lista de usuários:', error);
    }
}
