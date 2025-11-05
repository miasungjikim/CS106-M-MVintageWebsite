//front js : depends on what main category choose, show different sub category
const categoryMainSelect = document.getElementById("category-main");
const categorySubSelect = document.getElementById("category-sub");

const subcategories = {
    Tops: ["T-shirt", "Blouse"],
    Pants: ["Short pants", "Long pants"],
    Dresses: ["Day dress", "Vintage dress", "Evening dress"],
    Outerwear: ["Jacket", "Coat", "Cardigan"],
    Accessories: ["Bag", "Hat", "Scarf", "Jewelry"],
};

categoryMainSelect.addEventListener("change", function () {
    const main = this.value;
    const subs = subcategories[main] || [];

    // initialize option
    categorySubSelect.innerHTML = '<option value="">Select subcategory</option>';

    // add sub option
    subs.forEach(function (sub) {
        const option = document.createElement("option");
        option.value = sub;
        option.textContent = sub;
        categorySubSelect.appendChild(option);
    });
});


//backend.js

const form = document.getElementById("product-create-form");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // 기본 제출 막기

    // 입력값 수집
    const name = document.getElementById("name").value;
    const price = document.getElementById("price")?.value || 0; // 혹시 나중에 price 추가되면 대비
    const categoryMain = document.getElementById("category-main").value;
    const categorySub = document.getElementById("category-sub").value;
    const description = document.getElementById("description")?.value || "";
    const imageUrl = document.getElementById("image-url").value;
    const stockS = document.getElementById("stock-s").value || 0;
    const stockM = document.getElementById("stock-m").value || 0;
    const stockL = document.getElementById("stock-l").value || 0;
    const stockXL = document.getElementById("stock-xl").value || 0;


    const productData = {
        name,
        price,
        categoryMain,
        categorySub,
        description,
        imageUrl,
        stockS,
        stockM,
        stockL,
        stockXL,
    };


    fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
    })
        .then((res) => res.json())
        .then((data) => {
            alert("PRODUCT ADDED SUCCESSFUL");
            setTimeout(() => {
                window.location.href = "./ad-products.html";
            }, 300);
        })
        .catch(() => alert("FAILED TO ADD PRODUCT"));
});