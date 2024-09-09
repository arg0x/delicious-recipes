document.addEventListener("DOMContentLoaded", async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const recipeId = urlParams.get("id");

	if (recipeId) {
		try {
			const response = await fetch(
				`http://localhost:8001/api/recipes/${recipeId}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				},
			);

			if (response.ok) {
				const recipe = await response.json();

				document.getElementById("name").value = recipe.name;
				document.getElementById("description").value = recipe.description;
				document.getElementById("image").value = recipe.image;
				document.getElementById("category").value = recipe.category;
				document.getElementById("servings").value = recipe.servings;
				document.getElementById("cookingTime").value = recipe.cookingTime;
				document.getElementById("ingredients").value =
					recipe.ingredients.join(", ");
				document.getElementById("instructions").value =
					recipe.instructions.join(", ");
				document.getElementById("tools").value = recipe.tools.join(", ");
			} else {
				console.error("Failed to fetch recipe");
			}
		} catch (error) {
			console.error("Error fetching recipe:", error);
		}
	}

	document
		.getElementById("recipeForm")
		.addEventListener("submit", async function (e) {
			e.preventDefault();

			const formData = {
				name: document.getElementById("name").value,
				description: document.getElementById("description").value,
				image: document.getElementById("image").value,
				category: document.getElementById("category").value,
				servings: document.getElementById("servings").value,
				cookingTime: document.getElementById("cookingTime").value,
				ingredients: document.getElementById("ingredients").value.split(","),
				instructions: document.getElementById("instructions").value.split(","),
				tools: document.getElementById("tools").value.split(","),
			};

			try {
				const method = recipeId ? "PUT" : "POST";
				const endpoint = recipeId
					? `http://localhost:8001/api/recipes/${recipeId}`
					: "http://localhost:8001/api/recipes";

				const response = await fetch(endpoint, {
					method: method,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify(formData),
				});

				if (response.ok) {
					alert(
						recipeId
							? "Recipe updated successfully!"
							: "Recipe added successfully!",
					);
					window.location.href = "manage-recipes.html";
				} else {
					alert("Failed to save recipe");
				}
			} catch (error) {
				console.error("Error saving recipe:", error);
				alert("An error occurred while saving the recipe.");
			}
		});
});
