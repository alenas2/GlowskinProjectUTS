// Dark Mode Toggle
function toggleDarkMode() {
    const body = document.body;
    const toggleButton = document.getElementById('darkModeToggle');

    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        toggleButton.innerHTML = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        toggleButton.innerHTML = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const toggleButton = document.getElementById('darkModeToggle');

    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if (toggleButton) toggleButton.innerHTML = '☀️';
    } else {
        document.body.removeAttribute('data-theme');
        if (toggleButton) toggleButton.innerHTML = '🌙';
    }
}

// Products Data untuk Skincare
const products = [
    {
        id: 1,
        name: "Hanasui Vitamin C Serum",
        price: 26226,
        category: "serum",
        skinType: ["normal", "kering", "kombinasi"],
        image: "image/vitc.jpg",
        description: "Serum pencerah dengan Vitamin C 20% untuk kulit glowing"
    },
    {
        id: 2,
        name: "Cleora 8x Hyalu Hydrating Moisturizer",
        price: 72500,
        category: "moisturizer",
        skinType: ["kering", "normal"],
        image: "image/mois.jfif",
        description: "Pelembab dengan hyaluronic acid untuk kulit terhidrasi"
    },
    {
        id: 3,
        name: "Azarine Sunscreen SPF 50",
        price: 65000,
        category: "sunscreen",
        skinType: ["normal", "kering", "kombinasi"],
        image: "image/sunscreen.jfif",
        description: "Sunscreen broad spectrum protection PA++++"
    },
    {
        id: 4,
        name: "Cerave Foaming Facial Cleanser",
        price: "128.800 - 306.360",
        category: "cleanser",
        skinType: ["berminyak", "kombinasi"],
        image: "image/ff2.jfif",
        description: "Pembersih wajah berbusa untuk kulit berminyak"
    },
    {
        id: 5,
        name: "L'oreal Pure Clay Detox Mask",
        price: 165000,
        category: "mask",
        skinType: ["berminyak", "kombinasi"],
        image: "image/mask.jfif",
        description: "Masker detoks dengan clay untuk pori-pori bersih"
    },
    {
        id: 6,
        name: "Skintific Niacinamide Brightening Serum",
        price: 108000,
        category: "serum",
        skinType: ["berminyak", "kombinasi"],
        image: "image/nia.png",
        description: "Serum brightening dengan niacinamide 10%"
    },
    {
        id: 7,
        name: "Cellcosmet Gentle Cream Cleanser",
        price: 195000,
        category: "cleanser",
        skinType: ["kering", "normal", "sensitif"],
        image: "image/cc.jfif",
        description: "Pembersih lembut berbentuk cream untuk kulit kering"
    },
    {
        id: 8,
        name: "Tatcha Overnight Repair Cream",
        price: 299000,
        category: "moisturizer",
        skinType: ["kering", "normal"],
        image: "image/orc.jfif",
        description: "Night cream dengan retinol untuk perbaikan kulit"
    }
];

// Load Products on Products Page
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const searchInput = document.getElementById('searchProduct');
    const categoryFilter = document.getElementById('categoryFilter');
    const skinTypeFilter = document.getElementById('skinTypeFilter');

  function renderProducts(filteredProducts) {
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div class="col-12 text-center"><p>Produk tidak ditemukan.</p></div>';
        return;
    }

    filteredProducts.forEach(product => {
        const skinTypeBadges = product.skinType.map(type => 
            `<span class="badge bg-secondary me-1">${type}</span>`
        ).join('');

        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="product-card">
                    <img src="${product.image}" class="product-image" alt="${product.name}">
                    <div class="product-body">
                        <h5 class="product-title">${product.name}</h5>
                        <p class="product-description">${product.description}</p>
                        <div class="mb-2">${skinTypeBadges}</div>
                        <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                        <button class="btn-product" onclick="viewProduct(${product.id})">Lihat Detail</button>
                    </div>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });
}

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const skinType = skinTypeFilter.value;

        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || product.category === category;
            const matchesSkinType = !skinType || product.skinType.includes(skinType);
            
            return matchesSearch && matchesCategory && matchesSkinType;
        });

        renderProducts(filtered);
    }

    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    skinTypeFilter.addEventListener('change', filterProducts);

    renderProducts(products);
}

// Product Detail Modal
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const skinTypes = product.skinType.join(', ');
        alert(`🔍 Detail Produk:\n\n✨ Nama: ${product.name}\n💰 Harga: Rp ${product.price.toLocaleString('id-ID')}\n📝 Deskripsi: ${product.description}\n🏷️ Kategori: ${product.category}\n👤 Untuk Kulit: ${skinTypes}`);
    }
}

// Contact Form Validation
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Harap isi semua field yang diperlukan.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Harap masukkan email yang valid.');
            return;
        }

        alert('Terima kasih! Pesan Anda telah dikirim.');
        contactForm.reset();
    });
}

// Cart Management
let cart = [];

function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;

    cartItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const priceNum = parsePrice(item.price);
        const total = priceNum * (item.quantity || 1);
        subtotal += total;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">Rp ${priceNum.toLocaleString('id-ID')}</div>
                    <div class="cart-quantity">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="ms-3 btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Hapus</button>
                    </div>
                </div>
            </div>
        `;
    });

    const shipping = subtotal > 0 ? 20000 : 0;
    const total = subtotal + shipping;

    if (document.getElementById('subtotal')) document.getElementById('subtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    if (document.getElementById('shipping')) document.getElementById('shipping').textContent = `Rp ${shipping.toLocaleString('id-ID')}`;
    if (document.getElementById('total')) document.getElementById('total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang belanja masih kosong!');
        return;
    }
    alert('Mengarahkan ke halaman pembayaran...');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupContactForm();
    loadTheme(); 

    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
});

// Product Detail Functions
function changeImage(thumb) {
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    
    thumb.classList.add('active');
    
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = thumb.src;
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput.value < 10) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

function addToCart() {
    const quantity = document.getElementById('quantity').value;
    const productName = document.getElementById('productName').textContent;
    
    alert(`✅ ${quantity} x ${productName} berhasil ditambahkan ke keranjang!`);
}

function buyNow() {
    const quantity = document.getElementById('quantity').value;
    const productName = document.getElementById('productName').textContent;
    
    alert(`🚀 Membeli ${quantity} x ${productName} - Arahkan ke checkout page!`);
}

function viewProduct(productId) {
    if (productId === 4) {
        window.location.href = 'detailproducts2.html';
    } else {
        window.location.href = `detailproducts.html?id=${productId}`;
    }
}

// Load product data based on URL parameter
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId && products) {
        const product = products.find(p => p.id == productId);
        if (product) {
            document.getElementById('productName').textContent = product.name;
            document.getElementById('productPrice').textContent = `Rp ${product.price.toLocaleString('id-ID')}`;
            document.getElementById('productDescription').textContent = product.description;
            document.getElementById('productCategory').textContent = product.category;
            document.getElementById('productBreadcrumb').textContent = product.name;
            
            const mainImage = document.getElementById('mainProductImage');
            if (mainImage) {
                mainImage.src = product.image;
            }
            
            // Update skin type badges
            const skinTypeBadges = document.getElementById('skinTypeBadges');
            if (skinTypeBadges) {
                skinTypeBadges.innerHTML = product.skinType.map(type => 
                    `<span class="badge bg-info me-1">${type}</span>`
                ).join('');
            }
        }
    }
}

// Helper: parse harga string ke number
function parsePrice(price) {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
        const match = price.match(/[\d\.]+/);
        if (match) {
            return Number(match[0].replace(/\./g, '')) || 0;
        }
    }
    return 0;
}

// Tambah produk ke cart berdasarkan id (untuk halaman detail)
function addToCartById(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) {
        alert('Produk tidak ditemukan.');
        return;
    }
    let quantity = 1;
    const qtyInput = document.getElementById('quantity');
    if (qtyInput) {
        const q = parseInt(qtyInput.value, 10);
        if (!isNaN(q) && q > 0) quantity = q;
    }
    addToCart(product, quantity);
    alert(`✅ ${quantity} x ${product.name} berhasil ditambahkan ke keranjang.`);
}

// Untuk halaman detailproducts.html
function addToCartFromPage() {
    let productId = null;
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('id')) productId = Number(urlParams.get('id'));
    if (!productId) {
        const name = document.getElementById('productName')?.textContent;
        const product = products.find(p => p.name === name);
        if (product) productId = product.id;
    }
    if (!productId) {
        alert('Tidak ada produk yang dipilih.');
        return;
    }
    addToCartById(productId);
}

// Perbaiki updateCartDisplay agar subtotal benar jika price string
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;

    cartItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const priceNum = parsePrice(item.price);
        const total = priceNum * (item.quantity || 1);
        subtotal += total;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">Rp ${priceNum.toLocaleString('id-ID')}</div>
                    <div class="cart-quantity">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="ms-3 btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Hapus</button>
                    </div>
                </div>
            </div>
        `;
    });

    const shipping = subtotal > 0 ? 20000 : 0;
    const total = subtotal + shipping;

    if (document.getElementById('subtotal')) document.getElementById('subtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    if (document.getElementById('shipping')) document.getElementById('shipping').textContent = `Rp ${shipping.toLocaleString('id-ID')}`;
    if (document.getElementById('total')) document.getElementById('total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// Cart functionality
function increaseQuantity(button) {
    const quantityDisplay = button.parentElement.querySelector('.quantity-display');
    let quantity = parseInt(quantityDisplay.textContent);
    quantityDisplay.textContent = quantity + 1;
    updateCartTotal();
}

function decreaseQuantity(button) {
    const quantityDisplay = button.parentElement.querySelector('.quantity-display');
    let quantity = parseInt(quantityDisplay.textContent);
    if (quantity > 1) {
        quantityDisplay.textContent = quantity - 1;
        updateCartTotal();
    }
}

function removeItem(button) {
    const cartItem = button.closest('.cart-item');
    cartItem.remove();
    updateCartTotal();
}

function updateCartTotal() {
    const totalAmount = document.querySelector('.total-amount');
    totalAmount.textContent = 'Rp44.180';
}

function checkout() {
    alert('Redirecting to checkout page...');
}

document.getElementById('selectAll').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});