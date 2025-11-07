
//login info (sidebar -> name)
const storedUser = localStorage.getItem("user");
const userNameSpan = document.getElementById("user-name");

if (storedUser && userNameSpan) {
    const user = JSON.parse(storedUser);
    userNameSpan.textContent = user.fullname || "User";
}

//signout
document.addEventListener("DOMContentLoaded", () => {
    const signoutBtn = document.getElementById("signout-btn");

    if (!signoutBtn) return;

    signoutBtn.addEventListener("click", (e) => {
        e.preventDefault();

        localStorage.removeItem("user");
        window.location.href = "./login.html";
    });
});

