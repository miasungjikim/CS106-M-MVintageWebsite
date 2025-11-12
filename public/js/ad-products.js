//1. add button -> move to ad-product-create.html
const addBtn = document.getElementById("addbtn");
addBtn.addEventListener("click", () => {
    window.location.href = "./ad-product-create.html";
});

//2. load all products as table
const tbody = document.getElementById("products-tbody");

fetch("/api/products")
    .then((res) => res.json())
    .then((products) => {
        tbody.innerHTML = "";

        products.forEach((product) => {
            const tr = document.createElement("tr");

            // make checkbox
            const tdCheck = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            tdCheck.appendChild(checkbox);

            // name
            const tdName = document.createElement("td");
            tdName.textContent = product.name || "";

            // category main
            const tdCategory = document.createElement("td");
            tdCategory.textContent = product.category?.main || "";

            // stock conditions 
            const tdStock = document.createElement("td");
            const hasStock = (product.sizes || []).some((s) => Number(s.stock) > 0);
            tdStock.textContent = hasStock ? "O" : "X";

            // move to the detail page
            const tdDetails = document.createElement("td");
            const detailsLink = document.createElement("a");
            detailsLink.textContent = "Details";
            detailsLink.href = `./ad-product-detail.html?id=${product._id}`;
            tdDetails.appendChild(detailsLink);

            tr.appendChild(tdCheck);
            tr.appendChild(tdName);
            tr.appendChild(tdCategory);
            tr.appendChild(tdStock);
            tr.appendChild(tdDetails);

            tbody.appendChild(tr);

            // delete
            const deleteLink = document.createElement("a");
            deleteLink.textContent = "Delete";
            deleteLink.href = "#"; // prevent default link behavior

            deleteLink.addEventListener("click", async (e) => {
                e.preventDefault(); // prevent page reload

                if (!confirm(`Delete "${product.name}"?`)) return;

                try {
                    const res = await fetch(`/api/products/${product._id}`, {
                        method: "DELETE",
                    });

                    // check HTTP status
                    if (!res.ok) {
                        alert("Failed to delete product (server error).");
                        console.error("Delete failed:", res.status, res.statusText);
                        return;
                    }

                    const result = await res.json();

                    // check response body
                    if (!result.success) {
                        alert("Failed to delete product in database.");
                        console.error("Delete failed:", result);
                        return;
                    }

                    // only remove row if delete was successful
                    tr.remove();
                } catch (err) {
                    console.error("Delete request error:", err);
                    alert("Network error while deleting product.");
                }
            });

            tdDetails.appendChild(deleteLink);
        });
    })
    .catch((err) => {
        console.error("Failed to load products", err);
    });
