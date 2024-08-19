// public/js/api/administrativo/historico.js

export function renderHistorico() {
    const contentArea = document.getElementById('modal-content-historico');
    contentArea.innerHTML = `
        <h1>Histórico de Atividades</h1>
        <table>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Usuário</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody id="historico-tbody">
                <!-- As atividades serão carregadas aqui -->
            </tbody>
        </table>
    `;

    carregarHistorico();
}

function carregarHistorico() {
    // Exemplo de chamada AJAX para obter histórico de atividades
    fetch('/api/administrativo/historico') // Ajuste a URL para o seu endpoint real
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('historico-tbody');
            tbody.innerHTML = ''; // Limpar o conteúdo anterior

            data.forEach(atividade => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${atividade.data}</td>
                    <td>${atividade.usuario}</td>
                    <td>${atividade.acao}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar o histórico:', error);
        });
}
