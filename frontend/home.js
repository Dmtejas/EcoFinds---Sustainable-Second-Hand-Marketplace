const productGrid = document.getElementById('product-grid');
const searchBar = document.querySelector('.search-bar');

let products = [];

async function fetchProducts() {
    try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        products = await res.json();
        renderProducts(products);
    } catch (err) {
        console.error(err);
        productGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
}

function renderProducts(items) {
    productGrid.innerHTML = '';

    if (items.length === 0) {
        productGrid.innerHTML = '<p>No products found.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
          <img src="/uploads/${item.images[0] || 'placeholder.png'}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p class="price">₹${item.price}</p>
          <p class="desc">${item.description || ''}</p>
          <button class="add-cart">Add to Cart</button>
        `;

        productGrid.appendChild(card);

        // Updated add-to-cart handler
        card.querySelector('.add-cart').addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if item already exists
            const exists = cart.find(c => c.title === item.title);
            if (exists) {
                alert(`You already added "${item.title}" to cart!`);
                return;
            }

            cart.push({
                title: item.title || "Untitled",
                price: item.price || 0,
                image: `/uploads/${item.images && item.images.length > 0 ? item.images[0] : 'placeholder.png'}`,
                description: item.description || '',
                quantity: 1
            });

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`Added "${item.title}" to cart!`);
        });
    });
}

// Search filter
searchBar.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(query) ||
        (p.category && p.category.toLowerCase().includes(query))
    );
    renderProducts(filtered);
});

fetchProducts();