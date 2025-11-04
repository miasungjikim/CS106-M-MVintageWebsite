const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const data = {
            email,
            password
        };

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);

                if (!result.success) {
                    alert(result.message || "😭 LOGIN FAILED");
                    return;
                }

                //when success === true
                const userInfo = {
                    fullname: result.fullname,
                    email: result.email,
                    role: result.role,
                };

                localStorage.setItem("user", JSON.stringify(userInfo));
                //move to server.js redirect value
                if (result.redirect) {
                    window.location.href = result.redirect;
                } else {
                    alert("FAIlED")
                }
            })
            .catch((err) => {
                console.log(err);
                alert("SERVER ERROR");
            });
    });
}