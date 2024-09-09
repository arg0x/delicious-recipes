document.addEventListener("DOMContentLoaded", () => {
	const date = document.getElementById("date");
	if (date) {
		const currentYear = new Date().getFullYear();
		date.textContent = currentYear;
	}

	const categoriesList = document.querySelector(".categories-wrapper");
	if (!categoriesList) {
		console.error("Categories list element not found.");
		return;
	}

	fetch("http://localhost:8001/api/recipes/categories")
		.then((response) => response.json())
		.then((data) => {
			categoriesList.innerHTML = "";
			data.forEach((category) => {
				const categoryHTML = `
                <a href="categories-type.html?category=${category._id}" class="tag">
                  <h5>${category._id}</h5>
                  <p>${category.count} recipe${category.count > 1 ? "s" : ""}</p>
                </a>
              `;
				categoriesList.insertAdjacentHTML("beforeend", categoryHTML);
			});
		})
		.catch((error) => {
			console.error("Error fetching categories:", error);
			categoriesList.innerHTML = "<p>Failed to load categories.</p>";
		});
});
