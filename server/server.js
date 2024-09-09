require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/user.model");
const Recipe = require("./models/recipe.model");

const authenticateToken = require("./middleware/authenticateToken");
const recipeRoute = require("./routes/recipe.route");

const jwtSecret = process.env.JWT_SECRET;
const mongoURL = process.env.MONGODB_URL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/recipes", recipeRoute);

const port = 8001;

// Home route
app.get("/", (req, res) => {
	res.send("Hello from Server");
});

// Sign up route
app.post("/api/signup", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ $or: [{ email }, { username }] });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "User with this email or username already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ username, email, password: hashedPassword });

		await newUser.save();

		const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
			expiresIn: "1h",
		});
		res.status(200).json({ token });
		console.log("Account created");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Sign in route
app.post("/api/signin", async (req, res) => {
	const { usernameOrEmail, password } = req.body;

	try {
		// Try to find user by username or email
		const user = await User.findOne({
			$or: [
				{ email: usernameOrEmail.toLowerCase() },
				{ username: usernameOrEmail.toLowerCase() },
			],
		});

		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid username/email or password" });
		}

		// Check if the password matches
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res
				.status(400)
				.json({ message: "Invalid username/email or password" });
		}

		// If valid, generate token and respond with it
		const token = jwt.sign({ userId: user._id }, jwtSecret, {
			expiresIn: "1h",
		});

		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.get("/api/dashboard", authenticateToken, async (req, res) => {
	try {
		// Find the user by their ID (from token)
		const user = await User.findById(req.user.userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Count the number of recipes the user has added
		const totalRecipes = await Recipe.countDocuments({ user: req.user.userId });

		// Send back the username and totalRecipes count
		res.status(200).json({
			username: user.username,
			totalRecipes: totalRecipes,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Database connection and server start
mongoose
	.connect(mongoURL)
	.then(() => {
		console.log("Connected to database!");

		app.listen(port, () => {
			console.log("Server is running on port", port);
		});
	})
	.catch((error) => {
		console.log("Failed to connect to database:", error.message);
	});
