document.getElementById('loginBtn').addEventListener('click', async function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (username === "" || password === "") {
        errorMessage.textContent = "Usuário e senha são obrigatórios.";
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        console.log(response)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result && response.ok) {
            localStorage.setItem('token', result.token);
            window.location.href = 'administrativo.html';
        } else {
            errorMessage.textContent = result.message || 'Erro desconhecido';
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        errorMessage.textContent = 'Erro ao fazer login.';
    }
});
