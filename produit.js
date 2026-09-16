document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    fetch('catalogue.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                const badgesHTML = product.badges.map(b => `<span class="badge">${b}</span>`).join('');
                
                document.getElementById('product-container').innerHTML = `
                    <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start;">
                        <div style="flex: 1; min-width: 300px;">
                            <img src="${product.image}" alt="${product.title}" style="width:100%; border-radius: 12px; border: 1px solid var(--border-color); object-fit: cover;">
                        </div>
                        <div style="flex: 1; min-width: 300px;">
                            <h1 style="margin-bottom: 0.5rem; font-size: 2rem;">${product.title}</h1>
                            <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
                                ${badgesHTML}
                            </div>
                            <h2 style="color: var(--primary-color); font-size: 1.8rem; margin-bottom: 1.5rem;">${product.price}</h2>
                            <h3 style="margin-bottom: 0.5rem;">Aperçu :</h3>
                            <p style="color: #94a3b8; font-size: 1.1rem; margin-bottom: 1.5rem;">${product.description}</p>
                            <h3 style="margin-bottom: 0.5rem;">Spécifications techniques :</h3>
                            <p style="color: #cbd5e1; line-height: 1.8; margin-bottom: 2rem;">${product.detailsLongs}</p>
                            
                            <a href="mailto:ton-email@exemple.com?subject=Demande concernant l'article: ${product.title}" class="btn primary" style="width: 100%;">Me contacter pour cet article</a>
                        </div>
                    </div>
                `;
            } else {
                document.getElementById('product-container').innerHTML = `
                    <div style="text-align: center; padding: 4rem 0;">
                        <h1>Erreur : Produit introuvable</h1>
                        <p style="color: #94a3b8; margin-top: 1rem;">L'article que vous cherchez n'existe pas ou a été retiré.</p>
                        <a href="index.html" class="btn primary" style="margin-top: 2rem;">Retourner au catalogue</a>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Erreur :', error);
            document.getElementById('product-container').innerHTML = "<h1>Erreur de chargement des données.</h1>";
        });
});