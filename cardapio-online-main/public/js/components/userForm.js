// public/js/components/userForm.js

import { createUser, updateUser, getUserById } from '../api/usersApi.js';

/**
 * Preenche o formulário para editar um usuário.
 * @param {number} id - O ID do usuário a ser editado.
 */
export async function fillUserForm(id) {
    try {
        const user = await getUserById(id);
        document.getElementById('username').value = user.username;
        document.getElementById('password').value = user.password;
        document.getElementById('userId').value = user.id;
    } catch (error) {
        console.error('Erro ao preencher formulário:', error);
    }
}

/**
 * Cria um novo usuário ou atualiza um existente.
 */
export async function submitUserForm() {
    const id = document.getElementById('userId').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userData = { username, password };

    try {
        if (id) {
            await updateUser(id, userData);
        } else {
            await createUser(userData);
        }
        alert('Usuário salvo com sucesso!');
        window.location.reload();
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
    }
}
