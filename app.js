document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('product-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let products = [];

    fetch('catalogue.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(products);
        })
        .catch(error => console.error('Erreur lors du chargement du catalogue:', error));

    function renderProducts(items) {
        grid.innerHTML = ''; 
        
        items.forEach(product => {
            const badgesHTML = product.badges.map(badge => `<span class="badge">${badge}</span>`).join('');
            
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
                        <a href="produit.html?id=${product.id}" class="btn secondary">Voir les détails</a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

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