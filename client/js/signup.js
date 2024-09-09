document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll(".input-container input").forEach((input) => {
		input.addEventListener("input", function () {
			this.value = this.value.toLowerCase();
		});
	});

	const passwordField = document.getElementById("password");
	const passwordIcon = document.querySelector(".password-icon");

	passwordIcon.addEventListener("click", () => {
		if (passwordField.type === "password") {
			passwordField.type = "text";
			passwordIcon.classList.remove("fa-eye");
			passwordIcon.classList.add("fa-eye-slash");
		} else {
			passwordField.type = "password";
			passwordIcon.classList.remove("fa-eye-slash");
			passwordIcon.classList.add("fa-eye");
		}
	});

	document
		.querySelector(".login-button")
		.addEventListener("click", async (e) => {
			e.preventDefault();

			const username = document.getElementById("username").value;
			const email = document.getElementById("email").value;
			const password = document.getElementById("password").value;
			const confirmPassword = document.getElementById("confirm-password").value;

			if (!username || !email || !password || !confirmPassword) {
				alert("Please fill in all fields.");
				return;
			}

			if (password !== confirmPassword) {
				alert("Passwords do not match.");
				return;
			}

			try {
				const response = await fetch("http://localhost:8001/api/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, email, password }),
				});

				const data = await response.json();

				if (response.ok) {
					alert("Account created successfully!");
					window.location.href = "signin.html";
				} else {
					alert(data.message || "Failed to create account.");
				}
			} catch (error) {
				console.error("Error:", error);
				alert("Something went wrong, please try again later.");
			}
		});
});
