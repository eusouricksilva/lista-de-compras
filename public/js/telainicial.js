document.addEventListener("DOMContentLoaded", function() {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    })

    // Lista de itens
    var listItems = [
        {title: 'Supermercado', completed: 14, total: 30},
        {title: 'Açougue', completed: 2, total: 10},
        {title: 'Casas  Pedro', completed: 1, total: 15}
    ];

    // Função para criar um card
    function createCard(item) {
        var progress = (item.completed / item.total) * 100;

        var card = `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <span class="badge text-bg-primary rounded-pill">${item.completed}/${item.total}</span>
                <div class="progress mt-2">
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" style="width: ${progress}%"></div>
                </div>
            </div>
        </div>
        `;

        return card;
    }

    // Adiciona os cards à seção
    var listSection = document.getElementById('listSection');
    listItems.forEach(function(item) {
        listSection.innerHTML += createCard(item);
    });
});
