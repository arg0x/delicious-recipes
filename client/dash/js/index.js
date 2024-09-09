document.addEventListener("DOMContentLoaded", async () => {
	const token = localStorage.getItem("token");
	if (!token) {
		window.location.href = "signin.html";
	}

	try {
		const response = await fetch("http://localhost:8001/api/dashboard", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = await response.json();

		if (response.ok) {
			document.getElementById("welcomeUser").textContent =
				`Welcome ${data.username}`;
			document.getElementById("username").textContent = data.username;
			document.getElementById("totalRecipes").textContent = data.totalRecipes;
		} else {
			console.error("Error fetching dashboard data:", data.message);
		}
	} catch (error) {
		console.error("Error:", error);
	}
});
