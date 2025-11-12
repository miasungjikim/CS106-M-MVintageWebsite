

const addAdminBtn = document.getElementById("addAdminBtn");
if (addAdminBtn) {
    addAdminBtn.addEventListener("click", () => {
        alert("This feature (Add Admin) will be added in Sprint 2.");
    });
}

//table 
const tbody = document.getElementById("users-tbody");

fetch("/api/users")
    .then((res) => res.json())
    .then((users) => {
        tbody.innerHTML = "";

        users.forEach((user) => {
            const tr = document.createElement("tr");

            // Checkbox
            const tdCheck = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            tdCheck.appendChild(checkbox);

            // Name
            const tdName = document.createElement("td");
            tdName.textContent = user.fullname || "";

            // Email
            const tdEmail = document.createElement("td");
            tdEmail.textContent = user.email || "";

            // Phone
            const tdPhone = document.createElement("td");
            tdPhone.textContent = user.phone || "-";

            // Role
            const tdRole = document.createElement("td");
            tdRole.textContent = user.role || "user";

            // Details button --> just alert
            const tdDetails = document.createElement("td");
            const detailsBtn = document.createElement("button");
            detailsBtn.textContent = "Details";
            detailsBtn.addEventListener("click", () => {
                alert("User details page will be added in Sprint 2.");
            });
            tdDetails.appendChild(detailsBtn);


            tr.appendChild(tdCheck);
            tr.appendChild(tdName);
            tr.appendChild(tdEmail);
            tr.appendChild(tdPhone);
            tr.appendChild(tdRole);
            tr.appendChild(tdDetails);

            tbody.appendChild(tr);
        });
    })
    .catch((err) => {
        console.error("Failed to load users", err);
    });
