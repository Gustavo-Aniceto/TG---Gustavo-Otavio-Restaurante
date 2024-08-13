// public/js/api/administrativo/categorias.js
function renderFormCadastrocategoria() {
    const modal = document.getElementById('modal-categoria');
    modal.style.display = 'flex'; // Exibe o modal

    document.getElementById('categoriaForm').onsubmit = e => {
        e.preventDefault();
        salvarCategoria();
    };
}
