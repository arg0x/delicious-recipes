document.addEventListener("DOMContentLoaded", () => {
	const token = localStorage.getItem("token");
	const userLink = document.getElementById("user-link");

	if (token) {
		userLink.href = "dash/index.html";
		userLink.textContent = "Dashboard";
	} else {
		userLink.href = "signin.html";
		userLink.textContent = "Login";
	}
	const date = document.querySelector("#date");
	const currentYear = new Date().getFullYear();
	date.textContent = currentYear;
});
