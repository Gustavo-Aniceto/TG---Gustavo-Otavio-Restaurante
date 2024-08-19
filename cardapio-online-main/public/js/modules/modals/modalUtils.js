// public/js/modules/modals/modal.js

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
export function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';

        const closeModalButton = modal.querySelector('.btn-close');
        closeModalButton.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    } else {
        console.error(`Modal com ID ${modalId} não encontrado.`);
    }
}
