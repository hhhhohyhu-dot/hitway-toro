document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Cart Logic ---
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartBtn = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountElement = document.querySelector('.cart-count');
    const btnCheckout = document.querySelector('.btn-checkout');

    let cart = [];

    // Toggle Cart
    function toggleCart() {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }

    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // Add to Cart
    const addButtons = document.querySelectorAll('.btn-add-cart');
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-name');
            const price = parseInt(e.target.getAttribute('data-price'));

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCartUI();
            
            // Animation feedback
            e.target.textContent = "Ajouté ! ✓";
            e.target.style.backgroundColor = "#25D366";
            setTimeout(() => {
                if (price === 0) e.target.textContent = "Commander Promo";
                else e.target.textContent = "Ajouter au panier";
                e.target.style.backgroundColor = "";
            }, 2000);
        });
    });

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Votre panier est vide</div>';
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                count += item.quantity;

                const cartItemHTML = `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <div class="cart-item-price">${item.price > 0 ? item.price + ' DH' : 'PROMO'} x ${item.quantity}</div>
                        </div>
                        <button class="btn-remove-item" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
                cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
            });
        }

        cartTotalElement.textContent = total + ' DH';
        cartCountElement.textContent = count;
    }

    // Expose remove function to global scope
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartUI();
    };

    // Checkout via WhatsApp
    btnCheckout.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Votre panier est vide.');
            return;
        }

        let message = "Bonjour Hitway Toro ! Je souhaite commander les articles suivants :%0A%0A";
        let total = 0;

        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (${item.price > 0 ? item.price + ' DH' : 'Promo'})%0A`;
            total += item.price * item.quantity;
        });

        message += `%0A*Total : ${total} DH*`;

        const whatsappNumber = "212648017739";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
    });

    // --- Product Details Database ---
    const productDatabase = {
        "NANROBOT D4+": {
            badge: "ULTRA",
            price: "9500 DH",
            image: "assets/nanrobot_d4_plus.png",
            specs: [
                { icon: "fa-bolt", text: "Double moteur <strong>4000W</strong>" },
                { icon: "fa-gauge-high", text: "Vitesse incroyable <strong>85 km/h</strong>" },
                { icon: "fa-battery-full", text: "Autonomie <strong>75 km</strong> (60V 36AH)" },
                { icon: "fa-shield", text: "<strong>Freins HYDRAULIQUES</strong>" },
                { icon: "fa-palette", text: "Bandes <strong>LED RGB</strong> latérales" },
                { icon: "fa-road", text: "Pneus <strong>10 pouces off-road</strong>" }
            ]
        },
        "NANROBOT D4": {
            badge: "PROMO",
            price: "5999 DH",
            image: "assets/nanrobot_d4.png",
            specs: [
                { icon: "fa-bolt", text: "Moteur <strong>1200W</strong>" },
                { icon: "fa-gauge-high", text: "Vitesse max <strong>75 km/h</strong>" },
                { icon: "fa-battery-full", text: "Autonomie <strong>45 km</strong>" },
                { icon: "fa-circle-dot", text: "Pneus <strong>10 pouces</strong> route" },
                { icon: "fa-shield", text: "<strong>Freins à disque</strong> avant/arrière" },
                { icon: "fa-weight-scale", text: "Charge supportée <strong>150 kg</strong>" }
            ]
        },
        "GORO VOLT": {
            badge: "TOP VENTE",
            price: "5500 DH",
            image: "assets/goro_volt.png",
            specs: [
                { icon: "fa-bolt", text: "Moteur puissant <strong>1200W</strong>" },
                { icon: "fa-gauge-high", text: "Vitesse max <strong>75 km/h</strong>" },
                { icon: "fa-battery-full", text: "Autonomie <strong>65 km</strong> (21 AH)" },
                { icon: "fa-road", text: "Pneus tout-terrain <strong>11 pouces</strong>" },
                { icon: "fa-gears", text: "<strong>Double suspension</strong> renforcée" },
                { icon: "fa-lightbulb", text: "<strong>Double phares LED</strong> ultra-puissants" }
            ]
        },
        "TORO LS7": {
            badge: "PREMIUM",
            price: "5999 DH",
            image: "assets/toro_ls7.png",
            specs: [
                { icon: "fa-bolt", text: "Moteur <strong>1200W</strong>" },
                { icon: "fa-gauge-high", text: "Vitesse <strong>60 km/h</strong>" },
                { icon: "fa-battery-full", text: "Autonomie <strong>45 km</strong> (48V 20AH)" },
                { icon: "fa-palette", text: "Design exclusif <strong>LED RGB</strong> sur la tige" },
                { icon: "fa-shield", text: "<strong>Freins à disque</strong>" },
                { icon: "fa-gears", text: "<strong>Suspension</strong> avant/arrière" }
            ]
        },
        "TORO F1": {
            badge: "NOUVEAU",
            price: "5000 DH",
            image: "assets/toro_f1.png",
            specs: [
                { icon: "fa-bolt", text: "Moteur <strong>800W</strong>" },
                { icon: "fa-gauge-high", text: "Vitesse <strong>50 km/h</strong>" },
                { icon: "fa-battery-full", text: "Autonomie <strong>45 km</strong>" },
                { icon: "fa-weight-scale", text: "Châssis <strong>Solide et robuste</strong>" },
                { icon: "fa-lightbulb", text: "<strong>Éclairage LED complet</strong>" },
                { icon: "fa-gears", text: "<strong>Suspension complète</strong>" }
            ]
        },
        "VORTEX PRO": {
            badge: "SPORT",
            price: "4800 DH",
            image: "assets/vortex_pro.png",
            specs: [
                { icon: "fa-bolt", text: "Batterie <strong>17.5 AH</strong> haute capacité" },
                { icon: "fa-gauge-high", text: "Vitesse <strong>55 km/h</strong>" },
                { icon: "fa-battery-full", text: "Autonomie <strong>45 km</strong>" },
                { icon: "fa-road", text: "<strong>Pneus tout-terrain</strong>" },
                { icon: "fa-gears", text: "<strong>Suspension avancée</strong>" },
                { icon: "fa-chair", text: "Siège confortable <strong>inclus</strong>" }
            ]
        },
        "NEXON MAX": {
            badge: "ARRIVAGE",
            price: "4300 DH",
            image: "assets/nexon.png",
            specs: [
                { icon: "fa-bolt", text: "Moteur <strong>700W</strong>" },
                { icon: "fa-gauge-high", text: "Vitesse <strong>40 km/h</strong>" },
                { icon: "fa-battery-full", text: "Autonomie <strong>45 km</strong> (13.5 AH)" },
                { icon: "fa-circle-dot", text: "Pneus <strong>10 pouces</strong>" },
                { icon: "fa-gears", text: "<strong>Suspension</strong> avant/arrière" },
                { icon: "fa-shield", text: "<strong>Freins à disque</strong>" }
            ]
        },
        "RIDSTAR MOTO": {
            badge: "MOTO ÉLEC",
            price: "8400 DH",
            image: "assets/ridstar.png",
            specs: [
                { icon: "fa-bolt", text: "Moteur haute perf <strong>1000W</strong>" },
                { icon: "fa-gauge-high", text: "Vitesse <strong>50 km/h</strong>" },
                { icon: "fa-battery-full", text: "Autonomie <strong>45 km</strong> (15.7 AH)" },
                { icon: "fa-motorcycle", text: "Design <strong>Moto / Fat Bike</strong> 20\"" },
                { icon: "fa-display", text: "<strong>Écran LCD</strong> multifonction" },
                { icon: "fa-key", text: "<strong>Démarrage sécurisé</strong> par clé" }
            ]
        },
        "VELO V8 ULTRA MINI": {
            badge: "MINI FAT",
            price: "7500 DH",
            image: "assets/velo_v8.png",
            specs: [
                { icon: "fa-bolt", text: "Moteur <strong>400W</strong>" },
                { icon: "fa-gauge-high", text: "Vitesse <strong>30 km/h</strong>" },
                { icon: "fa-battery-full", text: "Autonomie <strong>40 km</strong> (36V 10.4AH)" },
                { icon: "fa-bicycle", text: "Design <strong>Vélo OUXI V8</strong> mini" },
                { icon: "fa-lightbulb", text: "Phare avant <strong>Rétro LED</strong>" },
                { icon: "fa-shield", text: "<strong>Garantie 12 mois</strong>" }
            ]
        },
        "CASQUE COOLRIDER NOIR": {
            badge: "SÉCURITÉ",
            price: "600 DH",
            image: "assets/casque_noir.png",
            specs: [
                { icon: "fa-shield-halved", text: "<strong>Protection maximale</strong> intégrale" },
                { icon: "fa-wind", text: "<strong>Ventilation optimale</strong>" },
                { icon: "fa-couch", text: "<strong>Confort assuré</strong> intérieur" },
                { icon: "fa-glasses", text: "<strong>Visière résistante</strong> fumée" },
                { icon: "fa-certificate", text: "Design aérodynamique <strong>Premium</strong>" }
            ]
        },
        "CASQUE COOLRIDER MOTIF": {
            badge: "SPORTIF",
            price: "600 DH",
            image: "assets/casque_motif.png",
            specs: [
                { icon: "fa-shield-halved", text: "<strong>Protection maximale</strong> intégrale" },
                { icon: "fa-wind", text: "<strong>Ventilation optimale</strong>" },
                { icon: "fa-couch", text: "<strong>Confort assuré</strong> intérieur" },
                { icon: "fa-glasses", text: "<strong>Visière résistante</strong>" },
                { icon: "fa-palette", text: "<strong>Motifs fluo sportifs</strong>" }
            ]
        },
        "CASQUE COOLRIDER MATTE": {
            badge: "ÉLÉGANT",
            price: "600 DH",
            image: "assets/casque_matte.png",
            specs: [
                { icon: "fa-shield-halved", text: "<strong>Protection maximale</strong> intégrale" },
                { icon: "fa-wind", text: "<strong>Ventilation optimale</strong>" },
                { icon: "fa-couch", text: "<strong>Confort assuré</strong> intérieur" },
                { icon: "fa-glasses", text: "<strong>Visière résistante</strong> fumée" },
                { icon: "fa-fill-drip", text: "Finition <strong>Gris Matte élégant</strong>" }
            ]
        }
    };

    // --- Modal Logic ---
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('closeModalBtn');
    
    // Modal Elements
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalBadge = document.getElementById('modalBadge');
    const modalPrice = document.getElementById('modalPrice');
    const modalSpecsList = document.getElementById('modalSpecsList');
    const modalOrderBtn = document.getElementById('modalOrderBtn');

    // Add click event to all product images
    document.querySelectorAll('.product-image img').forEach(img => {
        img.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const btn = card.querySelector('.btn-add-cart');
            const productName = btn.getAttribute('data-name');
            
            openModal(productName);
        });
    });

    function openModal(productName) {
        const data = productDatabase[productName];
        if (!data) return;

        modalTitle.textContent = productName;
        modalBadge.textContent = data.badge;
        modalPrice.textContent = data.price;
        modalImg.src = data.image;

        // Populate specs
        modalSpecsList.innerHTML = '';
        data.specs.forEach(spec => {
            const div = document.createElement('div');
            div.className = 'modal-spec-item';
            div.innerHTML = `<i class="fa-solid ${spec.icon}"></i> <span class="modal-spec-text">${spec.text}</span>`;
            modalSpecsList.appendChild(div);
        });

        // Setup order button
        modalOrderBtn.onclick = () => {
            const message = `Bonjour Hitway Toro, je suis intéressé par : ${productName} au prix de ${data.price}.`;
            const whatsappUrl = `https://wa.me/212648017739?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        };

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
