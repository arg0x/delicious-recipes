const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter recipe name"],
		},

		description: {
			type: String,
			required: true,
		},

		image: {
			type: String,
			required: true,
		},

		category: {
			type: String,
			required: true,
		},

		servings: {
			type: Number,
			required: true,
			default: 1,
		},

		cookingTime: {
			type: Number,
			required: true,
		},

		instructions: {
			type: [String],
			required: true,
		},

		ingredients: {
			type: [String],
			required: true,
		},

		tools: {
			type: [String],
			required: true,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
