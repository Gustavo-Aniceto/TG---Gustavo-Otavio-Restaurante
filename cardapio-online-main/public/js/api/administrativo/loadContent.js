// public/js/api/administrativo/loadContent.js

import { renderFormCadastroProduto } from './produtos.js';
import { carregarCategorias } from './categorias.js';
import { abrirModal } from '../../modals/modalUtils.js';

export function loadContent(page) {
    const contentArea = document.getElementById('main-content');
    let content = '';

    switch (page) {
        case 'produtos':
            content = `
                <h1>Gestão de Produtos</h1>
                <div id="produtos-actions">
                    <button class="btn-yellow" id="btnCadastrarProduto">Cadastrar Novo Produto</button>
                    <button class="btn-yellow" id="btnVerProdutos">Ver Produtos Cadastrados</button>
                </div>
                <div id="produtos-list"></div> <!-- Contêiner para a tabela de produtos -->
            `;
            contentArea.innerHTML = content;

            document.getElementById('btnCadastrarProduto').onclick = () => {
                abrirModal('modal-produto');
                renderFormCadastroProduto();
            };

            document.getElementById('btnVerProdutos').onclick = () => {
                mostrarProdutos(); 
            };
            break;
        case 'usuarios':
            content = `
                <h1>Gestão de Usuários</h1>
                <button class="btn-yellow" id="btnAdicionarUsuario">Adicionar Novo Usuário</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nome do Usuário</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="usuarios-tbody"></tbody>
                </table>
            `;
            contentArea.innerHTML = content;
            carregarUsuarios();

            document.getElementById('btnAdicionarUsuario').onclick = () => {
                abrirModal('modal-usuario');
            };
            break;
        case 'historico':
            content = '<h1>Histórico de Atividades</h1><p>Registro de atividades dos usuários...</p>';
            contentArea.innerHTML = content;
            break;
        case 'categorias':
            content = `
                <h1>Gestão de Categorias</h1>
                <button class="btn-yellow" id="btnAdicionarCategoria">Adicionar Nova Categoria</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nome da Categoria</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="categorias-tbody"></tbody>
                </table>
            `;
            contentArea.innerHTML = content;
            carregarCategorias();
            break;
        default:
            content = '<h1>Seja bem-vindo à Área Administrativa</h1><h3>Utilize o menu à esquerda para navegar pelas seções administrativas.</h3>';
            contentArea.innerHTML = content;
    }
}
