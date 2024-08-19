import { fecharModal } from './modalUtils.js'; // Importa a função para fechar o modal

export function renderFormCadastroUsuario() {
    const contentArea = document.getElementById('modal-content');
    contentArea.innerHTML = `
        <h1>Cadastrar Novo Usuário</h1>
        <form id="usuarioForm">
            <label for="u-nome">Nome do Usuário:</label>
            <input type="text" id="u-nome" name="nome" required>

            <label for="u-senha">Senha:</label>
            <input type="password" id="u-senha" name="senha" required>

            <button type="submit" id="btnSalvarUsuario" class="btn-yellow">Salvar</button>
        </form>
        <button class="btn-yellow" id="btnVoltarUsuarios">Voltar para Usuários</button>
    `;

    document.getElementById('btnSalvarUsuario').onclick = e => {
        e.preventDefault();
        salvarUsuario(); // Certifique-se de que a função salvarUsuario está implementada
    };

    document.getElementById('btnVoltarUsuarios').onclick = () => {
        fecharModal('modal-usuario'); // Fechar o modal
    };
}
