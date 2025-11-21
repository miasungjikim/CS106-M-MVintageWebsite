document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        document.getElementById("welcomeUser").textContent = `Welcome, ${user.fullname} !`;
    }




    // LOAD ALL PRODUCTS
    fetch("/api/products")
        .then(res => res.json())
        .then(products => {

            const categories = ["Tops", "Pants", "Dress", "Outerwear", "Accessories"];

            categories.forEach(cat => {
                const list = products.filter(p => p.category.main === cat);

                if (list.length > 0) {
                    const random = list[Math.floor(Math.random() * list.length)];
                    const imgTag = document.getElementById(`img_${cat}`);
                    if (imgTag) imgTag.src = random.images[0];
                }
            });

            const popularGrid = document.getElementById("popularGrid");
            popularGrid.innerHTML = "";

            categories.forEach(cat => {
                const list = products.filter(p => p.category.main === cat);

                if (list.length > 0) {
                    const random = list[Math.floor(Math.random() * list.length)];

                    const card = document.createElement("div");
                    card.classList.add("popular-card");

                    card.innerHTML = `
                        <img src="${random.images[0]}" alt="${random.name}">
                        <h3>${random.name}</h3>
                        <p class="price">$${random.price}</p>
                    `;

                    card.onclick = () =>
                        window.location.href = `product-detail.html?id=${random._id}`;

                    popularGrid.appendChild(card);
                }
            });

        });

});


document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
    } else {
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
    }

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        alert("Logged out!");
        window.location.reload();
    });
});