document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const listId = urlParams.get('id');
  
    const form = document.getElementById('formulario');
    const itemInput = document.getElementById('novo-item');
    const listElement = document.getElementById('lista');
  
    async function fetchList() {
      try {
        const response = await fetch(`/api/lists/${listId}`);
        if (response.ok) {
          const list = await response.json();
          document.querySelector('h1').textContent = list.name;
          renderList(list.items);
        } else {
          console.error('Erro ao buscar lista');
        }
      } catch (error) {
        console.error('Erro de rede ao buscar lista', error);
      }
    }
  
    async function addItemToList(item) {
      try {
        const response = await fetch(`/api/lists/${listId}/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ item })
        });
  
        if (response.ok) {
          const items = await response.json();
          renderList(items);
          itemInput.value = '';
        } else {
          console.error('Erro ao adicionar item');
        }
      } catch (error) {
        console.error('Erro de rede ao adicionar item', error);
      }
    }
  
    async function removeItemFromList(itemId) {
      try {
        const response = await fetch(`/api/lists/${listId}/items/${itemId}`, {
          method: 'DELETE'
        });
  
        if (response.ok) {
          fetchList();
        } else {
          console.error('Erro ao remover item');
        }
      } catch (error) {
        console.error('Erro de rede ao remover item', error);
      }
    }
  
    async function clearList() {
      try {
        const response = await fetch(`/api/lists/${listId}/items`, {
          method: 'DELETE'
        });
  
        if (response.ok) {
          renderList([]);
        } else {
          console.error('Erro ao limpar lista');
        }
      } catch (error) {
        console.error('Erro de rede ao limpar lista', error);
      }
    }
  
    function renderList(items) {
      listElement.innerHTML = '';
      items.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
          <span>${item.item}</span>
          <button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">Remover</button>
        `;
        listElement.appendChild(listItem);
      });
    }
  
    window.removeItem = removeItemFromList;
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newItem = itemInput.value.trim();
      if (newItem) {
        addItemToList(newItem);
      }
    });
  
    document.getElementById('limpar-lista').addEventListener('click', clearList);
  
    document.getElementById('voltar').addEventListener('click', () => {
      window.location.href = 'telainicial.html';
    });
  
    fetchList();
  });
  