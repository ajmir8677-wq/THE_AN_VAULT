let cart = [];

// Glowing Cursor Movement Effect
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
});

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    toggleCart(); 
}

function updateCartUI() {
    const countEl = document.getElementById('cart-count');
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');

    countEl.innerText = cart.length;

    if (cart.length === 0) {
        container.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
        totalEl.innerText = '0.00';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div class="cart-item-row">
                <div>
                    <strong>${item.name}</strong>
                    <div style="color: #ff3b30; font-size: 13px;">$${item.price}.00</div>
                </div>
                <button onclick="removeItem(${index})" style="background:none; border:none; color:#777; cursor:pointer;">✕</button>
            </div>
        `;
    });

    container.innerHTML = html;
    totalEl.innerText = total.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    drawer.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you! Your order has been placed successfully.');
    cart = [];
    updateCartUI();
    toggleCart();
}

// Simple Product Filter
function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}