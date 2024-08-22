export function renderFormCadastroProduto() {
    const contentArea = document.getElementById('modal-content-produto');

    // Verifica se contentArea existe antes de tentar definir o innerHTML
    if (!contentArea) {
        console.error("Elemento com o ID 'modal-content-produto' não foi encontrado.");
        return;
    }

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
            <img id="previewImage" style="display: none; width: 100px; margin-top: 10px;">

            <button type="submit" id="btnSalvar" class="btn-yellow">Salvar</button>
        </form>
        
    `;

    // Adiciona event listeners
    document.getElementById('btnSalvar').onclick = e => {
        e.preventDefault();
        salvarProduto();
    };


    document.getElementById('fileInput').addEventListener('change', function (event) {
        const previewImage = document.getElementById('previewImage');
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });

    // Função para carregar as categorias
    carregarCategorias();
}
