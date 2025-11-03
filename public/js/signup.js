// 1. Bring form
const signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault(); //no accept form loading 

        //2. Read input value 
        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const phone = Number(document.getElementById("phone").value);
        const address = document.getElementById("address").value.trim();

        const data = {
            fullname,
            email,
            password,
            phone,
            address,
        };

        //3. API -> Backend
        fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);

                if (result.success) {
                    alert(`Welcome ${fullname}`);
                    window.location.href = "./signin.html";
                } else {
                    alert(result.error || "There is an error. Try again.")
                }
            })
            .catch((err) => {
                console.log(err);
                alert("ERROR 👾");
            });
    });
}