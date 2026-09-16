document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('product-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let products = [];

    // 1. Récupération des données depuis le fichier JSON
    fetch('catalogue.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(products); // On affiche tout au chargement
        })
        .catch(error => console.error('Erreur lors du chargement du catalogue:', error));

    // 2. Fonction pour créer et afficher les cartes HTML
    function renderProducts(items) {
        grid.innerHTML = ''; // On vide la grille
        
        items.forEach(product => {
            // Création des badges s'il y en a
            const badgesHTML = product.badges.map(badge => `<span class="badge">${badge}</span>`).join('');
            
            // Construction de la carte
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="card-content">
                    <div class="badges">${badgesHTML}</div>
                    <h3 class="card-title">${product.title}</h3>
                    <p class="card-desc">${product.description}</p>
                    <div class="card-footer">
                        <span class="price">${product.price}</span>
                        <a href="#contact" class="btn primary">Commander</a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // 3. Gestion des filtres
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Gérer la classe 'active' sur les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Filtrer le tableau
            const category = e.target.getAttribute('data-filter');
            if (category === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
            }
        });
    });
});