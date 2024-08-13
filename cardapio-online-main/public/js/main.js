// public/js/main.js


import { displayUserList } from './components/userList.js';
import { submitUserForm, fillUserForm } from './components/userForm.js';
import { abrirModal, fecharModal, configurarBotaoFechar } from './modules/modals/modal.js';

// Outras importações e código


/**
 * Inicializa o aplicativo.
 */
function init() {
    displayUserList();

    document.getElementById('userForm').addEventListener('submit', (event) => {
        event.preventDefault();
        submitUserForm();
    });

    // Exemplo de como preencher o formulário para edição
    // fillUserForm(1); // Substitua o 1 pelo ID do usuário que deseja editar
}

document.addEventListener('DOMContentLoaded', init);
$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:3000/produtos', // URL da API
        method: 'GET',
        success: function(data) {
            data.forEach(category => {
                const categoryContainer = $(`#itensCardapio-${category._id.toLowerCase()}`);

                category.items.forEach(produto => {
                    const produtoHtml = `
                        <div class="col-12 col-md-4 col-sm-6">
                            <div class="item-cardapio">
                                <img src="${produto.imagem}" alt="${produto.nome}">
                                <h3>${produto.nome}</h3>
                                <p>${produto.descricao}</p>
                                <span class="price">R$ ${produto.preco}</span>
                            </div>
                        </div>
                    `;
                    categoryContainer.append(produtoHtml);
                });
            });
        },
        error: function(error) {
            console.error('Erro ao buscar os produtos:', error);
        }
    });
});
