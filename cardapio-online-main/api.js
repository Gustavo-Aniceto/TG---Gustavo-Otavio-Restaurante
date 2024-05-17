import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const criarUsuario = (usuario) => {
    return api.post('/usuarios', usuario);
};

export const buscarUsuario = (id) => {
    return api.get(`/usuarios/${id}`);
};

export const atualizarUsuario = (id, novoUsuario) => {
    return api.put(`/usuarios/${id}`, novoUsuario);
};

export const deletarUsuario = (id) => {
    return api.delete(`/usuarios/${id}`);
};
