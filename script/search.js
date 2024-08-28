const searchBar = document.getElementById("search-bar");
const searchResults = document.getElementById("search-results");

//Api call
async function fetchProducts() {
  const response = await fetch("/data/product.json");
  const products = await response.json();
  return products;
}

function searchProducts(query, products) {
  if (query.length < 3) return [];
  return products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
}

function renderProducts(products) {
  searchResults.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card bg-white p-4 shadow rounded";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover mb-4">
      <h2 class="text-lg font-semibold">${product.name}</h2>
      <p class="text-gray-500">${product.price}</p>
    `;
    searchResults.appendChild(productCard);
  });
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
    console.log(timeout);
  };
}

async function handleSearch(event) {
  const query = event.target.value;
  const products = await fetchProducts();
  const filteredProducts = searchProducts(query, products);
  renderProducts(filteredProducts);
}

searchBar.addEventListener("input", debounce(handleSearch, 300));
