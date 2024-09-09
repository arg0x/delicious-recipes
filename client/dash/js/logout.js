function handleLogout() {
	localStorage.removeItem("token");
	window.location.href = "../../client/index.html";
}

document.addEventListener("DOMContentLoaded", () => {
	const logoutButton = document.getElementById("logout-button");
	if (logoutButton) {
		logoutButton.addEventListener("click", handleLogout);
	}
});
