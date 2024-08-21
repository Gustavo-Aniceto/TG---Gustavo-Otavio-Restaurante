// public/js/api/usersApi.js

const API_URL = 'http://localhost:3000/users'; // Substitua pela URL real da sua API

/**
 * Obtém a lista de usuários da API.
 * @returns {Promise<Array>} A promessa que resolve com a lista de usuários.
 */
export async function getUsers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro ao obter usuários: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Cria um novo usuário.
 * @param {Object} userData - Os dados do novo usuário.
 * @returns {Promise<Object>} A promessa que resolve com os dados do usuário criado.
 */
export async function createUser(userData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error(`Erro ao criar usuário: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Atualiza um usuário existente.
 * @param {number|string} id - O ID do usuário a ser atualizado.
 * @param {Object} userData - Os dados atualizados do usuário.
 * @returns {Promise<Object>} A promessa que resolve com os dados do usuário atualizado.
 */
export async function updateUser(id, userData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error(`Erro ao atualizar usuário: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Exclui um usuário.
 * @param {number|string} id - O ID do usuário a ser excluído.
 * @returns {Promise<void>} A promessa que resolve quando o usuário for excluído.
 */
export async function deleteUser(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Erro ao excluir usuário: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
