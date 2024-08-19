// public/js/modals/produtoModal.js

import { renderFormCadastroProduto } from '../api/administrativo/produtos.js';

export function abrirModalProduto() {
    abrirModal('modal-produto');
    renderFormCadastroProduto();
}
