import { fecharModal } from './modalUtils.js'; // Importa a função para fechar o modal

export function renderFormCadastroCategoria() {
    const contentArea = document.getElementById('modal-content');
    contentArea.innerHTML = `
        <h1>Cadastrar Nova Categoria</h1>
        <form id="categoriaForm">
            <label for="c-nome">Nome da Categoria:</label>
            <input type="text" id="c-nome" name="nome" required>

            <button type="submit" id="btnSalvarCategoria" class="btn-yellow">Salvar</button>
        </form>
        <button class="btn-yellow" id="btnVoltarCategorias">Voltar para Categorias</button>
    `;

    document.getElementById('btnSalvarCategoria').onclick = e => {
        e.preventDefault();
        salvarCategoria(); // Certifique-se de que a função salvarCategoria está implementada
    };

    document.getElementById('btnVoltarCategorias').onclick = () => {
        fecharModal('modal-categoria'); // Fechar o modal
    };
}
