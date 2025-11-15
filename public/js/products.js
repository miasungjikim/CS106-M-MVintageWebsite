//1.read url parameter
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

//2. category title and contents  


document.getElementById("categoryTitle").textContent = category || "";

const content = {
    Tops: "From effortless everyday charm to standout statement pieces, our vintage tops are made to move with your mood. Discover silhouettes and textures that echo the past and elevate your style today.",
    Pants: "From laid-back classics to bold retro cuts, our vintage pants bring comfort, confidence, and character to every step. Explore timeless styles that shape your look and tell your story.",
    Dress: "From tea-time charm to moonlit elegance, our vintage dresses capture every mood and moment. Flow through the decades in silhouettes that celebrate femininity, grace, and timeless allure.",
    Outerwear: "Layer your look with stories from the past—our vintage outerwear wraps you in warmth, edge, and timeless flair. From tailored coats to statement jackets, find your perfect finishing piece.",
    Accessories: "Add personality to every outfit with vintage accessories that speak softly but stand out. From cozy socks to classic belts and elegant shawls, each piece adds timeless detail to your unique style."
};

document.getElementById("categoryContent").textContent = content[category] || "";


//3. Bring all products from API 
async function loadProducts() {
    const res = await fetch("/api/products");
    const products = await res.json();

    //category filtering 
    const filtered = products.filter(
        (item) => item.category.main === category
    );

    renderProducts(filtered);

}

loadProducts();

//4. loading products
function renderProducts(list) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    list.forEach(p => {
        grid.innerHTML += `
            <div class="product-card" onclick="goDetail('${p._id}')">
                <img src="${p.images[0]}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="price">$${p.price}</p>
            </div>
        `;
    });
}

//5. move to detail image
function goDetail(id) {
    window.location.href = `product-detail.html?id=${id}`;
}