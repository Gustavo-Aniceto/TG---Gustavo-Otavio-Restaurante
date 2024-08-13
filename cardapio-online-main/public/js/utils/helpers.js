// public/js/utils/helpers.js

/**
 * Limpa o conteúdo de um elemento.
 * @param {string} elementId - O ID do elemento a ser limpo.
 */
export function clearElement(elementId) {
    document.getElementById(elementId).innerHTML = '';
}
