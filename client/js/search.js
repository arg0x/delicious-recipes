document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const query = params.get("query");
	const categoryTitle = document.getElementById("category-title");
	const recipesList = document.getElementById("recipes-list");

	if (!query || !categoryTitle || !recipesList) {
		console.error("Required elements are missing or query is undefined.");
		return;
	}

	categoryTitle.textContent = `Search Results for: ${query}`;

	fetch(
		`http://localhost:8001/api/recipes/search?query=${encodeURIComponent(query)}`,
	)
		.then((response) => response.json())
		.then((data) => {
			if (data.recipes && data.recipes.length > 0) {
				recipesList.innerHTML = "";

				data.recipes.forEach((recipe) => {
					const recipeElement = document.createElement("a");
					recipeElement.href = `recipe.html?id=${recipe._id}`;
					recipeElement.classList.add("recipe");
					recipeElement.innerHTML = `
                        <img src="${recipe.image}" class="img recipe-img" alt="${recipe.name}" />
                        <h5>${recipe.name}</h5>
                        <p>Servings : ${recipe.servings} | Cooking Time : ${recipe.cookingTime}</p>
                        ${recipe.user ? `<p>Added by: ${recipe.user.username}</p>` : ""}
                    `;
					recipesList.appendChild(recipeElement);
				});
			} else {
				recipesList.innerHTML = "<p>No recipes found matching your search.</p>";
			}
		})
		.catch((error) => {
			console.error("Error fetching recipes:", error);
			recipesList.innerHTML = "<p>Failed to load recipes.</p>";
		});
});
