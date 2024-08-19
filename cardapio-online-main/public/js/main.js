import { renderFormCadastroProduto } from './modals/produtoModal.js';
import { renderFormCadastroUsuario } from './modals/usuarioModal.js';
import { renderFormCadastroCategoria } from './modals/categoriaModal.js';
import { renderHistorico } from './modals/historicoModal.js';
import { abrirModal } from './modals/modalUtils.js';
import { loadContent } from './api/administrativo/loadContent.js';

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
            // Código para exibir produtos cadastrados
            mostrarProdutos(); 
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
