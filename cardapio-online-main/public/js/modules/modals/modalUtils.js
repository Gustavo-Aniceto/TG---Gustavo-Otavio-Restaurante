// public/js/modules/modals/modal.js

export function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

export function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

export function configurarBotaoFechar(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const closeButton = modal.querySelector('.btn-close');
        if (closeButton) {
            closeButton.onclick = () => fecharModal(modalId);
        }
    }
}
