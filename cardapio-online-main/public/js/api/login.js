// public/js/api/administrativo/login.js

document.getElementById('loginBtn').addEventListener('click', async function() {
    // Obtém os valores dos campos de entrada
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Valida a entrada
    if (username === "" || password === "") {
        errorMessage.textContent = "Usuário e senha são obrigatórios.";
        return;
    }

    try {
        // Faz a solicitação POST para a API de login
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result && response.ok) {
            // Armazena o token no localStorage e redireciona para a página administrativa
            localStorage.setItem('token', result.token);
            window.location.href = 'administrativo.html';
        } else {
            // Exibe uma mensagem de erro se não for possível fazer login
            errorMessage.textContent = result.message || 'Erro desconhecido';
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        errorMessage.textContent = 'Erro ao fazer login.';
    }
});
