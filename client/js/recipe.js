document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const recipeId = params.get("id");

	const recipeImage = document.querySelector(".recipe-hero-img");
	const recipeName = document.querySelector(".recipe-info h2");
	const recipeDescription = document.querySelector(".recipe-info p");
	const recipeIcons = document.querySelector(".recipe-icons");
	const recipeInstructions = document.querySelector(".single-instruction");
	const recipeIngredients = document.getElementById("ingredients-list");
	const recipeTools = document.getElementById("tools-list");

	fetch(`http://localhost:8001/api/recipes/${recipeId}`)
		.then((response) => response.json())
		.then((recipe) => {
			recipeImage.src = recipe.image;
			recipeName.textContent = recipe.name;
			recipeDescription.textContent = recipe.description;
			recipeIcons.innerHTML = `
            <article>
            <i class="fas fa-user-plus"></i>
            <h5>Added by</h5>
            <p>${recipe.user.username}</p>
            </article>
            <article>
              <i class="fas fa-utensils"></i>
              <h5>Category</h5>
              <p>${recipe.category}</p>
            </article>
            <article>
              <i class="far fa-clock"></i>
              <h5>Cook Time</h5>
              <p>${recipe.cookingTime} min</p>
            </article>
            <article>
              <i class="fas fa-users"></i>
              <h5>Servings</h5>
              <p>${recipe.servings} servings</p>
            </article>
          `;

			recipeInstructions.innerHTML = recipe.instructions
				.map((step, index) => {
					return `
              <div class="single-instruction">
                <header>
                  <p>step ${index + 1}</p>
                  <div></div>
                </header>
                <p>${step}</p>
              </div>
            `;
				})
				.join("");

			recipeIngredients.innerHTML = recipe.ingredients
				.map((ingredient) => {
					return `<p class="single-ingredient">${ingredient}</p>`;
				})
				.join("");

			recipeTools.innerHTML = recipe.tools
				.map((tool) => {
					return `<p class="single-tool">${tool}</p>`;
				})
				.join("");
		})
		.catch((error) => {
			console.error("Error fetching recipe details:", error);
		});
});
