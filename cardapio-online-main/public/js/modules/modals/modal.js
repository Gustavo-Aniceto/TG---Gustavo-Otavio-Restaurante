// public/js/modules/modal.js

/**
 * Abre um modal e configura o evento de fechamento.
 * @param {string} modalId - O ID do modal a ser aberto.
 */
export function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        modal.onclick = e => {
            if (e.target === modal) {
                fecharModal(modalId);
            }
        };
    } else {
        console.error(`Modal com ID ${modalId} não encontrado.`);
    }
}

/**
 * Fecha um modal.
 * @param {string} modalId - O ID do modal a ser fechado.
 */
export function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    } else {
        console.error(`Modal com ID ${modalId} não encontrado.`);
    }
}

/**
 * Configura o comportamento de um botão de fechamento dentro de um modal.
 * @param {string} modalId - O ID do modal.
 * @param {string} btnFecharId - O ID do botão de fechar.
 */
export function configurarBotaoFechar(modalId, btnFecharId) {
    const btnFechar = document.getElementById(btnFecharId);
    if (btnFechar) {
        btnFechar.onclick = () => fecharModal(modalId);
    } else {
        console.error(`Botão de fechar com ID ${btnFecharId} não encontrado.`);
    }
}
