document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('typeEmailX').value;
        const password = document.getElementById('typePasswordX').value;

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            // Redirecionar para a página inicial após o login bem-sucedido
            window.location.href = '/home';
        } else {
            console.error('Erro ao fazer login');
        }
    });
});
