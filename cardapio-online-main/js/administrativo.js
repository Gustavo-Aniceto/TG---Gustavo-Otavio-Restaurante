function loadContent(page) {
    const contentArea = document.getElementById('main-content');
    let content = '';

    switch (page) {
        case 'produtos':
            content = `
                <h1>Gestão de Produtos</h1>
                <div id="produtos-actions">
                    <button class="btn-yellow" id="btnCadastrarProduto">Cadastrar Novo Produto</button>
                    <button class="btn-yellow" id="btnVerProdutos">Ver Produtos Cadastrados</button>
                    <button class="btn-yellow" id="btnCadastrarCategorias">Cadastrar Nova Categoria</button>
                </div>
                <div id="produtos-list"></div> <!-- Contêiner para a tabela de produtos -->
            `;
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
                carregarUsuarios(); // Função para carregar os usuários cadastrados
                document.getElementById('btnAdicionarUsuario').onclick = () => {
                    renderFormCadastroUsuario();
                };
                break;
            

        case 'historico':
            content = '<h1>Histórico de Atividades</h1><p>Registro de atividades dos usuários...</p>';
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
                carregarCategorias();
                break;
        default:
            content = '<h1>Bem-vindo à Área Administrativa</h1><p>Utilize o menu à esquerda para navegar pelas seções administrativas.</p>';
    }

    contentArea.innerHTML = content;

    if (page === 'produtos') {
        document.getElementById('btnCadastrarProduto').onclick = () => {
            renderFormCadastroProduto();
        };

        document.getElementById('btnVerProdutos').onclick = () => {
            mostrarProdutos(); 
        };
        document.getElementById('btnCadastrarCategorias').onclick = () => {
            renderFormCadastrocategoria(); 
        };
        
    }
}

function renderFormCadastroProduto() {
    const contentArea = document.getElementById('main-content');
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

function renderFormCadastrocategoria() {
    const modal = document.getElementById('modal-categoria');
    modal.style.display = 'flex'; // Exibe o modal

    document.getElementById('categoriaForm').onsubmit = e => {
        e.preventDefault();
        salvarCategoria();
    };
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none'; // Oculta o modal
}

