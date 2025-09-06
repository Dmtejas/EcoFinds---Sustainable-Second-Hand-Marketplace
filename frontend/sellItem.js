document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("listing-form");
  const previewContainer = document.getElementById("image-preview-container");

  // ---------- Image Preview ----------
  const fileInput = document.getElementById("file-upload");
  fileInput.addEventListener("change", () => {
    previewContainer.innerHTML = "";
    Array.from(fileInput.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "100px";
        img.style.marginRight = "10px";
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });

  // ---------- Submit Listing ----------
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) return alert("Please login first.");

    const formData = new FormData(form);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Failed to list item");
      alert("Item listed successfully!");
      form.reset();
      previewContainer.innerHTML = "";
      fetchAllProducts();
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  });

  // ---------- Fetch & Display ----------
  const fetchAllProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const products = await res.json();
      const grid = document.querySelector(".product-grid") || createGrid();
      grid.innerHTML = "";
      products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-card";
        const imgSrc = p.images.length ? `/uploads/${p.images[0]}` : "https://via.placeholder.com/200";
        div.innerHTML = `
          <img src="${imgSrc}" alt="${p.title}">
          <h3>${p.title}</h3>
          <p class="price">₹${p.price}</p>
          <p class="desc">${p.description || ""}</p>
          <button class="add-cart">Add to Cart</button>
        `;
        grid.appendChild(div);
      });
    } catch (err) {
      console.error(err);
    }
  };

  fetchAllProducts();
});
