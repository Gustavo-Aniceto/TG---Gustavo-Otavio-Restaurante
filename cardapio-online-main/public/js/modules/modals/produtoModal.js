// public/js/modals/produtoModal.js

import { carregarCategorias } from '../../api/categorias.js';

export function renderFormCadastroProduto() {
    const contentArea = document.getElementById('modal-content-produto');
    contentArea.innerHTML = `
        <h1>Cadastrar Novo Produto</h1>
        <form id="produtoForm">
            <!-- Campos do formulário -->
        </form>
        <button class="btn-yellow" id="btnSalvarProduto">Salvar Produto</button>
    `;
    carregarCategorias();
    // Código para salvar o produto
}
