const Recipe = require("../models/recipe.model");

// Public
const getRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find({}).populate("user", "username");
		res.status(200).json(recipes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Public
const getRecipe = async (req, res) => {
	try {
		const { id } = req.params;
		const recipe = await Recipe.findById(id).populate("user", "username");
		res.status(200).json(recipe);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Protected
const addRecipe = async (req, res) => {
	try {
		// Associate the recipe with the logged-in user
		const recipe = await Recipe.create({ ...req.body, user: req.user.userId });
		res.status(200).json(recipe);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Protected
const updateRecipe = async (req, res) => {
	try {
		const { id } = req.params;

		const recipe = await Recipe.findByIdAndUpdate(id, req.body);

		if (!recipe) {
			return res.status(404).json({ message: "Recipe not found" });
		}

		const updatedRecipe = await Recipe.findById(id).populate(
			"user",
			"username",
		);
		res.status(200).json(updatedRecipe);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Protected
const deleteRecipe = async (req, res) => {
	try {
		const { id } = req.params;

		const recipe = await Recipe.findByIdAndDelete(id);

		if (!recipe) {
			return res.status(404).json({ message: "Recipe not found" });
		}

		res.status(200).json({ message: "Recipe deleted successfully " });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Protected
const getRecipesFromUser = async (req, res) => {
	try {
		const recipes = await Recipe.find({ user: req.user.userId });
		res.status(200).json(recipes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Public
const getCategoriesWithCounts = async (req, res) => {
	try {
		// Use MongoDB's aggregation pipeline to group by category and count them
		const categories = await Recipe.aggregate([
			{ $group: { _id: "$category", count: { $sum: 1 } } },
		]);
		res.status(200).json(categories);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Public
const getRecipesByCategory = async (req, res) => {
	try {
		const { category } = req.query;
		const recipes = await Recipe.find({ category: category }).populate(
			"user",
			"username",
		);

		if (!recipes.length) {
			return res
				.status(404)
				.json({ message: "No recipes found in this category" });
		}

		res.status(200).json({ recipes });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Public
const Search = async (req, res) => {
	try {
		const { query } = req.query;
		const searchQuery = {};
		const regexQuery = { $regex: query, $options: "i" };
		searchQuery.$or = [
			{ name: regexQuery },
			{ ingredients: regexQuery },
			{ category: regexQuery },
			{ tools: regexQuery },
			{ steps: regexQuery },
		];

		const numericQuery = Number(query);
		if (!isNaN(numericQuery)) {
			searchQuery.$or.push(
				{ servings: numericQuery },
				{ cookingTime: numericQuery },
			);
		}

		const recipes = await Recipe.find(searchQuery).populate("user", "username");

		res.status(200).json({ recipes });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getRecipes,
	getRecipe,
	addRecipe,
	updateRecipe,
	deleteRecipe,
	getRecipesFromUser,
	getCategoriesWithCounts,
	getRecipesByCategory,
	Search,
};
