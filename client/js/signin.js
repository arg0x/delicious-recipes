document.addEventListener("DOMContentLoaded", () => {
	document
		.getElementById("signin-form")
		.addEventListener("submit", async (event) => {
			event.preventDefault();
			const usernameOrEmail = document.getElementById("usernameOrEmail").value;
			const password = document.getElementById("password").value;

			const response = await fetch("http://localhost:8001/api/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ usernameOrEmail, password }),
			});

			const data = await response.json();
			console.log(data);
			if (response.ok && data.token) {
				localStorage.setItem("token", data.token);
				alert("Logged in successfully!");
				window.location.href = "dash/index.html";
			} else {
				alert(data.message || "Sign-in failed.");
			}
		});
});
