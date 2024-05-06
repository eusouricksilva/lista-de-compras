const formulario = document.getElementById('formulario');
const listaCompras = document.getElementById('listaCompras');
const listaComprados = document.getElementById('listaComprados');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const nomeProduto = document.getElementById('nomeProduto').value;
    const quantidade = document.getElementById('quantidade').value;
    const valorProduto = document.getElementById('valorProduto').value;

    if (nomeProduto && quantidade > 0 && valorProduto > 0) {
        const novoItem = document.createElement('li');
        novoItem.classList.add('list-group-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function(event) {
            const item = event.target.closest('.list-group-item');
            if (this.checked) {
                listaCompras.removeChild(novoItem);
                listaComprados.appendChild(novoItem);
            } else {
                listaComprados.removeChild(novoItem);
                listaCompras.appendChild(novoItem);
            }
        });

        const conteudoItem = document.createElement('span');
        const valorTotal = quantidade * valorProduto;
        conteudoItem.textContent = `${nomeProduto} - Quantidade: ${quantidade} - Valor Total: R$${valorTotal}`;

        const botaoExcluir = document.createElement('button');
botaoExcluir.textContent = 'Excluir';
botaoExcluir.classList.add('btn', 'btn-danger'); // Adiciona as classes do Bootstrap
botaoExcluir.addEventListener('click', function() {
    novoItem.remove();
});


        novoItem.appendChild(checkbox);
        novoItem.appendChild(conteudoItem);
        novoItem.appendChild(botaoExcluir);

        listaCompras.appendChild(novoItem);

        // Limpar os campos do formulário
        document.getElementById('nomeProduto').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('valorProduto').value = '';
    }
});
