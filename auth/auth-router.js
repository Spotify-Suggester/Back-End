const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");
const generateToken = require("../config/generateToken");
const getAccessToken = require("../spotify/getAccessToken");

// registers new user
router.post("/register", async (req, res) => {
	const user = req.body;

	const hash = bcrypt.hashSync(user.password, 10);

	user.password = hash;

	try {
		const newUser = await Users.add(user);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json(error);
	}
});

// logins user
router.post("/login", async (req, res) => {
	let { username, password } = req.body;

	try {
		const user = await Users.findBy({ username }).first();

		if (user && bcrypt.compareSync(password, user.password)) {
			const token = generateToken(user);
			const access_token = getAccessToken();
			res.status(200).json({ message: `Welcome ${user.username}!`, token, access_token });
		} else {
			res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;