document.addEventListener("DOMContentLoaded", () => {
	const recipesList = document.getElementById("recipes-list");

	fetch("http://localhost:8001/api/recipes")
		.then((response) => response.json())
		.then((data) => {
			recipesList.innerHTML = "";

			data.forEach((recipe) => {
				const recipeHTML = `
          <a href="recipe.html?id=${recipe._id}" class="recipe">
            <img
              src="${recipe.image}"
              class="img recipe-img"
              alt="${recipe.name}"
            />
            <h5>${recipe.name}</h5>
            <p>Servings: ${recipe.servings} | Cook: ${recipe.cookingTime}min</p>
          </a>
        `;
				recipesList.insertAdjacentHTML("beforeend", recipeHTML);
			});
		})
		.catch((error) => {
			console.error("Error fetching recipes:", error);
			recipesList.innerHTML = "<p>Failed to load recipes.</p>";
		});
});

document.addEventListener("DOMContentLoaded", () => {
	const categoriesList = document.querySelector(".categories-list");
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
                    <a href="categories-type.html?category=${category._id}">
                        ${category._id} (${category.count})
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
