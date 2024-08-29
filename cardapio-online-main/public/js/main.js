import { renderFormCadastroProduto } from './modules/modals/produtoModal.js';
import { renderFormCadastroUsuario } from './modules/modals/usuarioModal.js';
import { renderFormCadastroCategoria } from './modules/modals/categoriaModal.js';
import { renderHistorico } from './modules/modals/historicoModal.js';
import { abrirModal } from './modules/modals/modalUtils.js';
import { loadContent } from './api/administrativo/loadContent.js';
import { fecharModal } from './modules/modals/modalUtils.js';
import { listarProdutos } from './api/produtos.js'; // Importação da função para mostrar produtos

// Inicializa o aplicativo
function init() {
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('href').replace('#', '');
            loadContent(page);
        });
    });

    // Configurar eventos dos botões
    const btnCadastrarProduto = document.getElementById('btnCadastrarProduto');
    const btnVerProdutos = document.getElementById('btnVerProdutos');
    const btnCadastrarCategorias = document.getElementById('btnCadastrarCategorias');
    const btnAdicionarUsuario = document.getElementById('btnAdicionarUsuario');
    const btnHistorico = document.getElementById('btnHistorico');

    if (btnCadastrarProduto) {
        btnCadastrarProduto.addEventListener('click', () => {
            abrirModal('modal-produto');
            renderFormCadastroProduto();
        });
    }

    if (btnVerProdutos) {
        btnVerProdutos.addEventListener('click', () => {
            mostrarProdutos(); // Código para exibir produtos cadastrados
        });
    }

    if (btnCadastrarCategorias) {
        btnCadastrarCategorias.addEventListener('click', () => {
            abrirModal('modal-categoria');
            renderFormCadastroCategoria();
        });
    }

    if (btnAdicionarUsuario) {
        btnAdicionarUsuario.addEventListener('click', () => {
            abrirModal('modal-usuario');
            renderFormCadastroUsuario();
        });
    }

    if (btnHistorico) {
        btnHistorico.addEventListener('click', () => {
            abrirModal('modal-historico');
            renderHistorico();
        });
    }
}

// Executar a função de inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    init();
    loadContent('produtos');  // Carregar produtos por padrão
});
document.getElementById('btnCarrinho').addEventListener('click', function() {
    document.querySelector('.carrinho').classList.toggle('open');
});
