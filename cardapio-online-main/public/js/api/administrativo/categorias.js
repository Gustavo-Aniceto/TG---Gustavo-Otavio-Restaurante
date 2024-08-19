// public/js/api/administrativo/categorias.js

export function carregarCategorias() {
    $.ajax({
        url: 'http://localhost:3000/categorias',
        method: 'GET',
        success: function(data) {
            const categoriaSelect = document.getElementById('m-categoria');
            categoriaSelect.innerHTML = '';
            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.nome;
                categoriaSelect.appendChild(option);
            });
        },
        error: function(error) {
            console.error('Erro ao carregar categorias:', error);
        }
    });
}
