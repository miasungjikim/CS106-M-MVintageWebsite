//button color
document.addEventListener("DOMContentLoaded", () => {
    const sizeButtons = document.querySelectorAll(".size-btn");
    sizeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            sizeButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });
});



// url produict id
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// page factor 
const breadcrumb = document.querySelector(".breadcrumb");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDesc = document.getElementById("productDescription");
const productImg = document.getElementById("productImage");

// login user for the later data .. 
const user = JSON.parse(localStorage.getItem("loggedInUser")); // { _id, name, email, ... }

// bring products 
async function loadProduct() {
    try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Product not found");
        const product = await res.json();


        breadcrumb.textContent = `${product.category?.main} > ${product.category?.sub}`;
        productName.textContent = product.name;
        productPrice.textContent = `nzd $${product.price}`;
        productDesc.textContent = product.description;

        const imgs = product.images;
        productImg.src = imgs[0];


    } catch (err) {
        console.error("❌ Failed to load product:", err);
    }
}

// buy button
document.getElementById("buyNow").addEventListener("click", async () => {
    if (!user) {
        alert("Please sign in before purchasing.");
        window.location.href = "login.html";
        return;
    }

    try {
        const orderData = {
            userId: user._id,
            productId: productId,
        };

        const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        const data = await res.json();

        if (res.ok) {
            alert("Order placed successfully!");
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error("Order failed:", err);
        alert("Error: placing the order.");
    }
});


loadProduct();
