document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    fetch('catalogue.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                const badgesHTML = product.badges.map(b => `<span class="badge">${b}</span>`).join('');
                const container = document.getElementById('product-container');
                
                // SI C'EST UN PRODUIT NORMAL
                if (!product.isConfigurator) {
                    container.innerHTML = `
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
                } 
                // SI C'EST LE CONFIGURATEUR DE BATTERIE
                else {
                    container.innerHTML = `
                        <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start;">
                            <div style="flex: 1; min-width: 300px;">
                                <img src="${product.image}" alt="${product.title}" style="width:100%; border-radius: 12px; border: 1px solid var(--border-color); object-fit: cover; margin-bottom: 1rem;">
                                <h1 style="margin-bottom: 0.5rem; font-size: 2rem;">${product.title}</h1>
                                <p style="color: #94a3b8;">${product.detailsLongs}</p>
                                <div style="margin-top: 2rem; padding: 1.5rem; background-color: rgba(59, 130, 246, 0.1); border-left: 4px solid var(--primary-color); border-radius: 0 8px 8px 0;">
                                    <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">Modalités de commande</h3>
                                    <ul style="color: #cbd5e1; margin-left: 1.5rem; line-height: 1.6;">
                                        <li><strong>Délais :</strong> 6 à 14 jours (acheminement cellules) + 2 jours de fabrication.</li>
                                        <li><strong>Paiement :</strong> 50% d'acompte à la commande, reste a payer au moment de l'expédition.</li>
                                        <li><strong>Finition standard :</strong> Soudure nickel pur, scotch tissu, XT60 + JST-XH inclus.</li>
                                    </ul>
                                </div>
                            </div>

                            <div style="flex: 1; min-width: 300px; background-color: var(--card-bg); padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color);">
                                <h2 style="margin-bottom: 1.5rem; color: var(--primary-color);">Configurez votre pack</h2>
                                
                                <div style="margin-bottom: 1rem;">
                                    <label style="display: block; margin-bottom: 0.5rem;">Modèle des Cellules (21700)</label>
                                    <select id="cell-type" style="width: 100%; padding: 0.8rem; border-radius: 8px; background: var(--bg-color); color: white; border: 1px solid var(--border-color);">
                                        <option value="3.55" data-name="Molicel INR21700-P42A (4200mAh | 45A)">Molicel P42A - 3.55€/u</option>
                                        <option value="2.99" data-name="Samsung INR21700-40T (4000mAh | 35A)">Samsung 40T - 2.99€/u</option>
                                        <option value="3.59" data-name="Samsung INR21700-45T (4500mAh | 50A)">Samsung 45T - 3.59€/u</option>
                                        <option value="3.95" data-name="EVE INR21700-40PL (4000mAh | 70A)">EVE 40PL - 3.95€/u</option>
                                        <option value="3.95" data-name="EVE INR21700-50PL (5000mAh | 125A)">EVE 50PL - 3.95€/u</option>
                                        <option value="3.85" data-name="BAK INR21700-50D2 (5000mAh | 60A)">BAK 50D2 - 3.85€/u</option>
                                        <option value="3.99" data-name="BAK N21700-45D (4500mAh | 60A)">BAK 45D - 3.99€/u</option>
                                        <option value="3.95" data-name="Ampace INR21700-JP50 (5000mAh | 60A)">Ampace JP50 - 3.95€/u</option>
                                        <option value="4.65" data-name="Reliance INR21700-RS50 (5000mAh | 70A)">Reliance RS50 - 4.65€/u</option>
                                        <option value="2.45" data-name="Tenpower INR21700-40TG (4000mAh | 35A)">Tenpower 40TG - 2.45€/u</option>
                                        <option value="3.15" data-name="Tenpower INR21700-40XG (4000mAh | 45A)">Tenpower 40XG - 3.15€/u</option>
                                        <option value="4.18" data-name="Tenpower INR21700-50XG (5000mAh | 40A)">Tenpower 50XG - 4.18€/u</option>
                                        <option value="0" data-name="Autre">Autre référence (sur demande)</option>
                                    </select>
                                    <input type="text" id="custom-cell-input" placeholder="Précisez la référence (ex: Sony VTC6)" style="display: none; width: 100%; padding: 0.8rem; border-radius: 8px; background: var(--bg-color); color: white; border: 1px solid var(--border-color); margin-top: 0.5rem;">
                                </div>

                                <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                                    <div style="flex: 1;">
                                        <label style="display: block; margin-bottom: 0.5rem;">Série (S)</label>
                                        <input type="number" id="pack-s" value="6" min="2" max="12" style="width: 100%; padding: 0.8rem; border-radius: 8px; background: var(--bg-color); color: white; border: 1px solid var(--border-color);">
                                    </div>
                                    <div style="flex: 1;">
                                        <label style="display: block; margin-bottom: 0.5rem;">Parallèle (P)</label>
                                        <input type="number" id="pack-p" value="1" min="1" max="6" style="width: 100%; padding: 0.8rem; border-radius: 8px; background: var(--bg-color); color: white; border: 1px solid var(--border-color);">
                                    </div>
                                </div>

                                <div style="margin-bottom: 1rem;">
                                    <label style="display: block; margin-bottom: 0.5rem;">Connecteur</label>
                                    <select id="conn-type" style="width: 100%; padding: 0.8rem; border-radius: 8px; background: var(--bg-color); color: white; border: 1px solid var(--border-color);">
                                        <option value="0" data-name="XT60 (Inclus)">XT60 (Inclus)</option>
                                        <option value="3" data-name="XT30">XT30 (+3.00€)</option>
                                        <option value="3" data-name="XT90">XT90 (+3.00€)</option>
                                        <option value="3" data-name="Autre sur demande">Autre sur demande (+3.00€)</option>
                                    </select>
                                </div>

                                <div style="margin-bottom: 2rem;">
                                    <label style="display: block; margin-bottom: 0.5rem;">Système de gestion (BMS)</label>
                                    <select id="bms-type" style="width: 100%; padding: 0.8rem; border-radius: 8px; background: var(--bg-color); color: white; border: 1px solid var(--border-color);">
                                        <option value="0" data-name="Montage RC sans BMS">Montage brut RC / Sans BMS (0.00€)</option>
                                        <option value="15" data-name="BMS Standard adapté">Ajout d'un BMS adapté (+ ~15.00€)</option>
                                        <option value="35" data-name="Smart BMS Bluetooth">Smart BMS Bluetooth (+ ~35.00€)</option>
                                    </select>
                                    <small style="color: #64748b; margin-top: 0.5rem; display: block;">Le tarif du BMS est une estimation affinée lors du devis.</small>
                                </div>

                                <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem; margin-bottom: 1.5rem;">
                                    <h3 style="font-size: 1rem; color: #94a3b8; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px;">Détail du calcul</h3>
                                    
                                    <div style="display: flex; justify-content: space-between; font-size: 1rem; margin-bottom: 0.5rem;">
                                        <span>Cellules (x<span id="cell-count">6</span>) :</span>
                                        <span id="calc-cells">0.00€</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; font-size: 1rem; margin-bottom: 0.5rem;">
                                        <span>Forfait Base (Main d'œuvre, Matériaux) :</span>
                                        <span>30.00€</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; font-size: 1rem; margin-bottom: 0.5rem; display: none;" id="row-conn">
                                        <span>Option Connecteur :</span>
                                        <span id="calc-conn">0.00€</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; font-size: 1rem; margin-bottom: 1.5rem; display: none;" id="row-bms">
                                        <span>Option BMS :</span>
                                        <span id="calc-bms">0.00€</span>
                                    </div>

                                    <div style="display: flex; justify-content: space-between; font-size: 1.5rem; color: var(--primary-color); font-weight: bold; border-top: 1px dashed var(--border-color); padding-top: 1rem;">
                                        <span>Total estimé :</span>
                                        <span id="calc-total">0.00€</span>
                                    </div>
                                </div>
                                
                                <a href="#" id="order-btn" class="btn primary" style="width: 100%;">Demander un devis pour ce pack</a>
                            </div>
                        </div>
                    `;

                    // LOGIQUE DE CALCUL EN DIRECT
                    const cellSelect = document.getElementById('cell-type');
                    const customCellInput = document.getElementById('custom-cell-input');
                    const packS = document.getElementById('pack-s');
                    const packP = document.getElementById('pack-p');
                    const connSelect = document.getElementById('conn-type');
                    const bmsSelect = document.getElementById('bms-type');
                    
                    const spanCellCount = document.getElementById('cell-count');
                    const calcCells = document.getElementById('calc-cells');
                    const calcConn = document.getElementById('calc-conn');
                    const calcBms = document.getElementById('calc-bms');
                    const rowConn = document.getElementById('row-conn');
                    const rowBms = document.getElementById('row-bms');
                    const calcTotal = document.getElementById('calc-total');
                    const orderBtn = document.getElementById('order-btn');

                    function updatePrice() {
                        const cellPrice = parseFloat(cellSelect.value);
                        const isCustomCell = (cellPrice === 0);
                        
                        // Gestion de l'affichage du champ "Autre référence"
                        if (isCustomCell) {
                            customCellInput.style.display = 'block';
                        } else {
                            customCellInput.style.display = 'none';
                        }

                        const s = parseInt(packS.value) || 0;
                        const p = parseInt(packP.value) || 0;
                        const totalCells = s * p;
                        
                        const connPrice = parseFloat(connSelect.value);
                        const bmsPrice = parseFloat(bmsSelect.value);
                        
                        // Calculs
                        const cellsTotal = totalCells * cellPrice;
                        const baseForfait = 30; // 30€ fixes (main d'oeuvre, nickel, scotch)
                        const grandTotal = cellsTotal + baseForfait + connPrice + bmsPrice;

                        // Affichage dynamique
                        spanCellCount.textContent = totalCells;
                        
                        if (isCustomCell) {
                            calcCells.textContent = "Sur devis";
                        } else {
                            calcCells.textContent = cellsTotal.toFixed(2) + "€";
                        }
                        
                        // Gestion de l'affichage des lignes d'options
                        if (connPrice > 0) {
                            rowConn.style.display = 'flex';
                            calcConn.textContent = "+" + connPrice.toFixed(2) + "€";
                        } else {
                            rowConn.style.display = 'none';
                        }

                        if (bmsPrice > 0) {
                            rowBms.style.display = 'flex';
                            calcBms.textContent = "+" + bmsPrice.toFixed(2) + "€";
                        } else {
                            rowBms.style.display = 'none';
                        }

                        // Affichage du total selon si c'est sur mesure ou non
                        if (isCustomCell) {
                            calcTotal.textContent = "À partir de " + grandTotal.toFixed(2) + "€";
                        } else {
                            calcTotal.textContent = grandTotal.toFixed(2) + "€";
                        }

                        // Récupération du nom de la cellule pour l'email
                        let cellName = cellSelect.options[cellSelect.selectedIndex].getAttribute('data-name');
                        if (isCustomCell) {
                            const customName = customCellInput.value.trim();
                            cellName = customName !== "" ? customName : "Référence à définir";
                        }

                        const connName = connSelect.options[connSelect.selectedIndex].getAttribute('data-name');
                        const bmsName = bmsSelect.options[bmsSelect.selectedIndex].getAttribute('data-name');
                        
                        // Génération de l'email
                        const subject = encodeURIComponent(`Devis Pack Li-ion ${s}S${p}P`);
                        const body = encodeURIComponent(
`Bonjour,

Je souhaite valider un devis pour la fabrication d'un pack batterie avec les caractéristiques suivantes :

- Configuration : ${s}S${p}P (Total : ${totalCells} cellules)
- Modèle choisi : ${cellName}
- Connecteur : ${connName}
- BMS : ${bmsName}

L'estimateur indique un total de ${isCustomCell ? 'À partir de ' : ''}${grandTotal.toFixed(2)}€.

Je suis d'accord avec les modalités (50% d'acompte pour le lancement de la commande des cellules, délais d'acheminement, etc.).

Merci d'avance !`
                        );
                        
                        // Pense à remplacer l'adresse email par la tienne ici :
                        orderBtn.href = `mailto:ton-email@exemple.com?subject=${subject}&body=${body}`;
                    }

                    // Écouteurs d'événements
                    cellSelect.addEventListener('change', updatePrice);
                    customCellInput.addEventListener('input', updatePrice);
                    packS.addEventListener('input', updatePrice);
                    packP.addEventListener('input', updatePrice);
                    connSelect.addEventListener('change', updatePrice);
                    bmsSelect.addEventListener('change', updatePrice);

                    // Initialisation au chargement
                    updatePrice();
                }

            } else {
                document.getElementById('product-container').innerHTML = "<h1 style='text-align:center; margin-top:4rem;'>Produit introuvable</h1>";
            }
        });
});