//In url, bring productID
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

console.log("🔍 productId:", productId);


//2. Bring factor
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const categoryMainInput = document.getElementById("category-main");
const categorySubInput = document.getElementById("category-sub");
const stockSInput = document.getElementById("stock-s");
const stockMInput = document.getElementById("stock-m");
const stockLInput = document.getElementById("stock-l");
const stockXLInput = document.getElementById("stock-xl");
const imageUrlInput = document.getElementById("image-url");

//3. bring product detail
if (productId) {
    fetch(`/api/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            nameInput.value = product.name || "";
            priceInput.value = product.price || "";
            descriptionInput.value = product.description || "";

            categoryMainInput.value = product.category?.main || ""; //if product.category exist bring it, else undefined
            categorySubInput.value = product.category?.sub || "";

            //size stock check
            const sizeMap = {};
            product.sizes.forEach(s => sizeMap[s.size] = s.stock);

            stockSInput.value = sizeMap["S"] ?? 0;
            stockMInput.value = sizeMap["M"] ?? 0;
            stockLInput.value = sizeMap["L"] ?? 0;
            stockXLInput.value = sizeMap["XL"] ?? 0;

            imageUrlInput.value = product.images?.[0] || "";

            //ONLY FOR READING
            document.querySelectorAll("input").forEach(input => {
                input.setAttribute("readonly", true);
            });
        });
} else {
    alert("NO PRODUCT ID FOUND!!!!!!");
}

//move to edit 
const editBtn = document.getElementById("edit-product-btn");

if (editBtn && productId) {
    editBtn.addEventListener("click", function () {
        window.location.href = `./ad-product-update.html?id=${productId}`;
    });
}