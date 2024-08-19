import { fecharModal } from './modalUtils.js'; // Importa a função para fechar o modal

export function renderHistorico() {
    const contentArea = document.getElementById('modal-content');
    contentArea.innerHTML = `
        <h1>Histórico de Atividades</h1>
        <p>Registro de atividades dos usuários...</p>
        <button class="btn-yellow" id="btnVoltarHistorico">Voltar para Histórico</button>
    `;

    document.getElementById('btnVoltarHistorico').onclick = () => {
        fecharModal('modal-historico'); // Fechar o modal
    };
}
