const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

const {
	getRecipes,
	getRecipe,
	addRecipe,
	updateRecipe,
	deleteRecipe,
	getRecipesFromUser,
	getCategoriesWithCounts,
	getRecipesByCategory,
	Search,
} = require("../controllers/recipe.controller");

// view all recipes
router.get("/", getRecipes);

// get recipe added by a user
router.get("/user", authenticateToken, getRecipesFromUser);

// get recipes by category
router.get("/by-category", getRecipesByCategory);

// get category with count
router.get("/categories", getCategoriesWithCounts);

// search
router.get("/search", Search);

// view recipe with id
router.get("/:id", getRecipe);

// add/create recipe
router.post("/", authenticateToken, addRecipe);

// update/edit recipe
router.put("/:id", authenticateToken, updateRecipe);

// delete recipe
router.delete("/:id", authenticateToken, deleteRecipe);

module.exports = router;
