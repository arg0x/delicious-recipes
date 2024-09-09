document.addEventListener("DOMContentLoaded", async () => {
	try {
		const response = await fetch("http://localhost:8001/api/recipes/user", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		const recipes = await response.json();

		const tableBody = document.getElementById("recipeTableBody");

		recipes.forEach((recipe) => {
			const row = document.createElement("tr");

			row.innerHTML = `
                        <td>${recipe.name}</td>
                        <td>${recipe.category}</td>
                        <td>${recipe.cookingTime} mins</td>
                        <td>${recipe.servings}</td>
                        <td>
                            <a href="add-recipe.html?id=${recipe._id}" class="fas fa-edit" style="color:forestgreen"><i class="fas fa-edit" ></i></a>
                            <a href="#" class="fas fa-trash delete-icon" style="color:crimson"data-id="${recipe._id}" data-name="${recipe.name}"></a>                        </td>
                    `;

			tableBody.appendChild(row);
		});

		document.querySelectorAll(".delete-icon").forEach((button) => {
			button.addEventListener("click", async (event) => {
				event.preventDefault();
				const recipeId = button.getAttribute("data-id");
				const recipeName = button.getAttribute("data-name");

				if (
					confirm(`Are you sure you want to delete the recipe: ${recipeName}?`)
				) {
					try {
						const deleteResponse = await fetch(
							`http://localhost:8001/api/recipes/${recipeId}`,
							{
								method: "DELETE",
								headers: {
									Authorization: `Bearer ${localStorage.getItem("token")}`,
								},
							},
						);

						if (deleteResponse.ok) {
							alert(`Recipe ${recipeName} deleted successfully`);
							button.closest("tr").remove();
						} else {
							alert("Failed to delete recipe");
						}
					} catch (error) {
						console.error("Failed to delete recipe:", error);
						alert("Error deleting recipe");
					}
				}
			});
		});
	} catch (error) {
		console.error("Failed to fetch recipes:", error);
	}
});
