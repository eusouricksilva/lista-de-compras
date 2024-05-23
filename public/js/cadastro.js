document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document.getElementById('form3Example1').value;
        const lastName = document.getElementById('form3Example2').value;
        const email = document.getElementById('form3Example3').value;
        const password = document.getElementById('form3Example4').value;

        const response = await fetch('/api/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        if (response.ok) {
            // Redirecionar para a página inicial após o cadastro bem-sucedido
            window.location.href = '/home';
        } else {
            console.error('Erro ao cadastrar');
        }
    });
});
