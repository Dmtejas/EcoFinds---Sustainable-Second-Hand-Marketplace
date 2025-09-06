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

    card.querySelector('.add-cart').addEventListener('click', () => {
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
