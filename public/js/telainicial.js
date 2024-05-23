document.addEventListener("DOMContentLoaded", function() {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  
    document.getElementById('criarListaBtn').addEventListener('click', async function() {
      const listaNome = document.getElementById('listaNome').value;
      if (listaNome) {
        try {
          const response = await fetch('/api/lists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: listaNome })
          });
  
          if (response.ok) {
            const newList = await response.json();
            addListCard(newList);
            document.getElementById('listaNome').value = '';
            const modal = bootstrap.Modal.getInstance(document.getElementById('criarListaModal'));
            modal.hide();
          } else {
            console.error('Erro ao criar lista');
          }
        } catch (error) {
          console.error('Erro de rede ao criar lista', error);
        }
      }
    });
  
    function addListCard(list) {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${list.name}</h5>
          <p class="card-text">Itens na lista: ${list.items ? list.items.length : 0}</p>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${list.items ? list.items.length : 0}%" aria-valuenow="${list.items ? list.items.length : 0}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <button class="btn btn-primary mt-2" onclick="openList('${list.id}')">Abrir</button>
        </div>
      `;
      document.getElementById('cardsContainer').appendChild(card);
    }
  
    function openList(listId) {
      window.location.href = `lista.html?id=${listId}`;
    }
  
    async function fetchLists() {
      try {
        const response = await fetch('/api/lists');
        if (response.ok) {
          const lists = await response.json();
          if (lists.length === 0) {
            document.getElementById('noListsMsg').style.display = 'block';
          } else {
            document.getElementById('noListsMsg').style.display = 'none';
            lists.forEach(addListCard);
          }
        } else {
          console.error('Erro ao buscar listas');
        }
      } catch (error) {
        console.error('Erro de rede ao buscar listas', error);
      }
    }
  
    fetchLists();
  });
  