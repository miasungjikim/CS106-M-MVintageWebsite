//category 

const categoryMainSelect = document.getElementById("category-main");
const categorySubSelect = document.getElementById("category-sub");

const subcategories = {
    Tops: ["T-shirt", "Blouse"],
    Pants: ["Short pants", "Long pants"],
    Dresses: ["Day dress", "Vintage dress"],
    Outerwear: ["Jacket", "Coat", "Cardigan"],
    Accessories: ["Caps/Hats", "Socks", "Belts", "Bags"],
};

categoryMainSelect.addEventListener("change", function () {
    const main = this.value;
    const subs = subcategories[main] || [];
    categorySubSelect.innerHTML = '<option value="">Select subcategory</option>';
    subs.forEach((sub) => {
        const option = document.createElement("option");
        option.value = sub;
        option.textContent = sub;
        categorySubSelect.appendChild(option);
    });
});

//1. bring productId from url
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

//2. select id
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const stockSInput = document.getElementById("stock-s");
const stockMInput = document.getElementById("stock-m");
const stockLInput = document.getElementById("stock-l");
const stockXLInput = document.getElementById("stock-xl");
const imageUrlInput = document.getElementById("image-url");

//3. bring exist info 
if (productId) {
    fetch(`/api/products/${productId}`)
        .then((res) => res.json())
        .then((product) => {

            nameInput.value = product.name || "";
            imageUrlInput.value = product.images?.[0] || "";
            priceInput.value = product.price || "";
            descriptionInput.value = product.description || "";

            categoryMainSelect.value = product.category?.main || "";

            const subs = subcategories[product.category?.main] || [];
            categorySubSelect.innerHTML = '<option value="">Select subcategory</option>';
            subs.forEach((sub) => {
                const option = document.createElement("option");
                option.value = sub;
                option.textContent = sub;
                categorySubSelect.appendChild(option);
            });
            categorySubSelect.value = product.category?.sub || "";

            const sizeMap = {};
            product.sizes.forEach((s) => (sizeMap[s.size] = s.stock));
            stockSInput.value = sizeMap["S"] ?? 0;
            stockMInput.value = sizeMap["M"] ?? 0;
            stockLInput.value = sizeMap["L"] ?? 0;
            stockXLInput.value = sizeMap["XL"] ?? 0;
        });
}

//4. form submit -> put /api/products/:id
const form = document.getElementById("product-update-form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value;
    const price = priceInput.value;
    const categoryMain = categoryMainSelect.value;
    const categorySub = categorySubSelect.value;
    const imageUrl = imageUrlInput.value;
    const stockS = stockSInput.value || 0;
    const stockM = stockMInput.value || 0;
    const stockL = stockLInput.value || 0;
    const stockXL = stockXLInput.value || 0;
    const description = descriptionInput.value;

    const productData = {
        name,
        price,
        description,
        categoryMain,
        categorySub,
        imageUrl,
        stockS,
        stockM,
        stockL,
        stockXL,
    };

    fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
    })
        .then((res) => res.json())
        .then((data) => {
            alert("SAVED");
            window.location.href = `./ad-product-detail.html?id=${productId}`;
        })
        .catch(() => {
            alert("Failed to update product");
        });
});