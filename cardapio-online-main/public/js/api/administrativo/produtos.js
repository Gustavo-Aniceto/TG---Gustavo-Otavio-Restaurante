// public/js/api/administrativo/produtos.js

import { carregarCategorias } from '../categorias.js';
import { fecharModal } from '../../modules/modals/modalUtils.js';

export function renderFormCadastroProduto() {
    const contentArea = document.getElementById('modal-content');
    contentArea.innerHTML = `
        <h1>Cadastrar Novo Produto</h1>
        <form id="produtoForm">
            <label for="m-nome">Nome do Produto:</label>
            <input type="text" id="m-nome" name="nome" required>

            <label for="m-categoria">Categoria:</label>
            <select id="m-categoria" name="categoria" required></select>

            <label for="m-preco">Preço:</label>
            <input type="number" id="m-preco" name="preco" required>

            <label for="fileInput">Imagem do Produto:</label>
            <input type="file" id="fileInput" name="imagem">
            <button type="button" id="chooseImageButton">Escolher Imagem</button>
            <img id="previewImage" style="display: none; width: 100px; margin-top: 10px;">

            <button type="submit" id="btnSalvar" class="btn-yellow">Salvar</button>
        </form>
        <button class="btn-yellow" id="btnVoltarProdutos">Voltar para Produtos</button>
    `;
    carregarCategorias();

    document.getElementById('btnSalvar').onclick = e => {
        e.preventDefault();
        salvarProduto();
    };

    document.getElementById('btnVoltarProdutos').onclick = () => {
        loadContent('produtos');
        fecharModal('modal-produto');
    };

    document.getElementById('chooseImageButton').onclick = () => {
        document.getElementById('fileInput').click();
    };

    document.getElementById('fileInput').addEventListener('change', function(event) {
        const previewImage = document.getElementById('previewImage');
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });
}

