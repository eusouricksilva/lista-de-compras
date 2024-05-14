const formulario = document.getElementById('formulario');
const listaCompras = document.getElementById('listaCompras');
const listaComprados = document.getElementById('listaComprados');
const totalElement = document.getElementById('total');

let valorTotal = 0;

document.getElementById('nomeProduto').classList.add('form-control');
document.getElementById('quantidade').classList.add('form-control');
document.getElementById('valorProduto').classList.add('form-control');

formulario.setAttribute('autocomplete', 'off');
formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nomeProduto = document.getElementById('nomeProduto').value;
    let quantidade = document.getElementById('quantidade').value;
    const unidade = document.getElementById('unidade').value;
    const categoria = document.getElementById('categoria').value;
    let valorProduto = document.getElementById('valorProduto').value;
    
    // Substituir o símbolo de moeda e as vírgulas por pontos
    valorProduto = valorProduto.replace(/[^\d.,]/g, '').replace(',', '.');
    
    // Converter a quantidade e o valor do produto para números
    quantidade = parseFloat(quantidade);
    valorProduto = parseFloat(valorProduto);
    
    // Calcular o valor do item com base na unidade
    let valorItem;
    if (unidade === 'kg') {
        valorItem = quantidade * valorProduto;
    } else {
        // Converter a quantidade para a unidade de base (gramas ou mililitros)
        switch (unidade) {
            case 'g':
                quantidade *= 0.001; // Converter gramas para quilogramas
                break;
            case 'ml':
                quantidade *= 0.001; // Converter mililitros para litros
                break;
            default:
                break;
        }
        valorItem = quantidade * valorProduto;
    }
    
    if (nomeProduto && quantidade > 0 && valorProduto > 0) {
        valorTotal += valorItem;
        totalElement.textContent = `Valor Total: R$${valorTotal.toFixed(2)}`;

        const novoItem = document.createElement('li');
        novoItem.classList.add('list-group-item', 'd-sm-flex', 'flex-column', 'flex-sm-row', 'align-items-sm-center');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('form-check-input');
        checkbox.addEventListener('change', function(event) {
            const item = event.target.closest('.list-group-item');
            if (this.checked) {
                listaCompras.removeChild(novoItem);
                listaComprados.appendChild(novoItem);
                novoItem.classList.add('bg-success');
                novoItem.classList.add('text-white'); 
            } else {
                listaComprados.removeChild(novoItem);
                listaCompras.appendChild(novoItem);
                novoItem.classList.remove('bg-success');
                novoItem.classList.remove('text-white'); 
            }
            checkEmptyList();
        });

        const unidadeBase = unidade === 'kg' ? 'g' : unidade === 'l' ? 'ml' : unidade;
        const conteudoItem = document.createElement('span');
        conteudoItem.classList.add('text-break', 'flex-grow-1');
        conteudoItem.textContent = `${nomeProduto} - Quantidade: ${quantidade} ${unidade} - Categoria: ${categoria} - Valor Total: R$${valorItem.toFixed(2)}`;

        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.classList.add('btn', 'btn-warning', 'btn-block', 'ml-auto', 'me-2');
        botaoEditar.addEventListener('click', function() {
            document.getElementById('nomeProduto').value = nomeProduto;
            document.getElementById('quantidade').value = quantidade;
            document.getElementById('unidade').value = unidade;
            document.getElementById('categoria').value = categoria;
            document.getElementById('valorProduto').value = valorProduto.toFixed(2);
            valorTotal -= valorItem;
            totalElement.textContent = `Valor Total: R$${valorTotal.toFixed(2)}`;
            novoItem.remove();
        });

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.classList.add('btn', 'btn-danger', 'btn-block', 'ml-auto');
        botaoExcluir.addEventListener('click', function() {
            novoItem.remove();
            valorTotal -= valorItem;
            totalElement.textContent = `Valor Total: R$${valorTotal.toFixed(2)}`;
            checkEmptyList();
        });

        const itemContainer = document.createElement('div');
        itemContainer.classList.add('col-sm-8', 'd-flex', 'align-items-center', 'mb-2', 'mb-sm-0');
        itemContainer.appendChild(checkbox);
        itemContainer.appendChild(conteudoItem);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('col-sm-4', 'd-flex', 'justify-content-end', 'mt-2', 'mt-sm-0');
        buttonContainer.appendChild(botaoEditar);
        buttonContainer.appendChild(botaoExcluir);

        novoItem.appendChild(itemContainer);
        novoItem.appendChild(buttonContainer);

        listaCompras.appendChild(novoItem);

        // Limpar os campos do formulário
        document.getElementById('nomeProduto').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('unidade').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('valorProduto').value = '';

        // Verificar se a lista está vazia
        checkEmptyList();
    }
});

function checkEmptyList() {
    const listaComprasContainer = document.getElementById('minhaLista');
    const listaCompradosContainer = document.getElementById('meuCarrinho');
    
    if (listaCompras.children.length === 0) {
        listaComprasContainer.style.display = 'none';
    } else {
        listaComprasContainer.style.display = 'block';
    }
    
    if (listaComprados.children.length === 0) {
        listaCompradosContainer.style.display = 'none';
    } else {
        listaCompradosContainer.style.display = 'block';
    }

    // Verificar se ambas as listas estão vazias
    if (listaCompras.children.length === 0 && listaComprados.children.length === 0) {
        totalElement.style.display = 'none'; // Ocultar o elemento "Valor Total"
    } else {
        totalElement.style.display = 'block'; // Mostrar o elemento "Valor Total"
    }
}

// Chamar a função checkEmptyList no carregamento da página
document.addEventListener('DOMContentLoaded', checkEmptyList);
