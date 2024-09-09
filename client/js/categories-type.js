document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const category = params.get("category");
	const categoryTitle = document.getElementById("category-title");
	const recipesList = document.getElementById("recipes-list");

	if (!category || !categoryTitle || !recipesList) {
		console.error("Required elements are missing or category is undefined.");
		return;
	}

	categoryTitle.textContent = category;

	fetch(`http://localhost:8001/api/recipes/by-category?category=${category}`)
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
                    `;
					recipesList.appendChild(recipeElement);
				});
			} else {
				recipesList.innerHTML = "<p>No recipes found in this category.</p>";
			}
		})
		.catch((error) => {
			console.error("Error fetching recipes:", error);
			recipesList.innerHTML = "<p>Failed to load recipes.</p>";
		});
});
