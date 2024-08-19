import { abrirModal, configurarBotaoFechar } from './modules/modals/modal.js';
import { renderFormCadastroProduto } from './api/administrativo/produtos.js';
import { renderFormCadastroUsuario } from './api/administrativo/usuario.js'; // Adapte o caminho se necessário
import { renderFormCadastroCategoria } from './api/administrativo/categorias.js'; // Adapte o caminho se necessário
import { renderHistorico } from './api/administrativo/historico.js'; // Adapte o caminho se necessário
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

    const btnCadastrarProduto = document.getElementById('btnCadastrarProduto');
    const btnVerProdutos = document.getElementById('btnVerProdutos');
    const btnCadastrarCategorias = document.getElementById('btnCadastrarCategorias');
    const btnAdicionarUsuario = document.getElementById('btnAdicionarUsuario');
    const btnHistorico = document.getElementById('btnHistorico');

    if (btnCadastrarProduto) {
        btnCadastrarProduto.addEventListener('click', () => {
            abrirModal('modal-produto');
            renderFormCadastroProduto();
            configurarBotaoFechar('modal-produto');
        });
    }

    if (btnVerProdutos) {
        btnVerProdutos.addEventListener('click', () => {
            mostrarProdutos(); 
        });
    }

    if (btnCadastrarCategorias) {
        btnCadastrarCategorias.addEventListener('click', () => {
            abrirModal('modal-categoria');
            renderFormCadastroCategoria();
            configurarBotaoFechar('modal-categoria');
        });
    }

    if (btnAdicionarUsuario) {
        btnAdicionarUsuario.addEventListener('click', () => {
            abrirModal('modal-usuario');
            renderFormCadastroUsuario();
            configurarBotaoFechar('modal-usuario');
        });
    }

    if (btnHistorico) {
        btnHistorico.addEventListener('click', () => {
            abrirModal('modal-historico');
            renderHistorico();
            configurarBotaoFechar('modal-historico');
        });
    }
}

// Executar a função de inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Carregar a página inicial por padrão
    loadContent('produtos');
});
