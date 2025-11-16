document.addEventListener("DOMContentLoaded", loadOrders);

async function loadOrders() {
    try {
        const res = await fetch("/api/orders");
        const orders = await res.json();

        // 테이블을 넣을 container
        const container = document.getElementById("orders-table-container");

        // 테이블 생성
        const table = document.createElement("table");
        table.classList.add("order-table");

        table.innerHTML = `
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Product</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Price (NZD)</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        container.appendChild(table);

        const tbody = table.querySelector("tbody");

        orders.forEach((order) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${order._id}</td>
                <td>${order.fullname}</td>
                <td>${order.email}</td>
                <td>${order.product.name}</td>
                <td>${order.product.size}</td>
                <td style="text-align:center">${order.product.qty}</td>
                <td style="text-align:center">${order.product.price}</td>
                <td>
                    <select class="status-select">
                        <option value="PAID" ${order.status === "PAID" ? "selected" : ""}>PAID</option>
                        <option value="SHIPPING" ${order.status === "SHIPPING" ? "selected" : ""}>SHIPPING</option>
                        <option value="DELIVERED" ${order.status === "DELIVERED" ? "selected" : ""}>DELIVERED</option>
                        <option value="CANCELLED" ${order.status === "CANCELLED" ? "selected" : ""}>CANCELLED</option>
                    </select>
                </td>
                <td>
                    <button class="save-btn">Save</button>
                </td>
            `;

            // Save 버튼 기능
            const saveBtn = tr.querySelector(".save-btn");
            const statusSelect = tr.querySelector(".status-select");

            saveBtn.addEventListener("click", async () => {
                const newStatus = statusSelect.value;

                try {
                    const updateRes = await fetch(`/api/orders/${order._id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: newStatus }),
                    });

                    const updateData = await updateRes.json();

                    if (updateRes.ok) {
                        alert("Status updated!");
                    } else {
                        alert(updateData.message || "Update failed.");
                    }
                } catch (err) {
                    console.error("STATUS UPDATE FAILED:", err);
                    alert("Error updating status.");
                }
            });

            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error("LOAD ORDERS ERROR:", err);
        alert("Failed to load orders.");
    }
}
