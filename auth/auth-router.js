const router = require("express").Router();
const bcrypt = require("bcryptjs");


const Users = require("../users/users-model");
const generateToken = require("../config/generateToken");
const getAccessToken = require("../spotify/getAccessToken");

// registers new user
router.post("/register", async (req, res) => {
	const user = req.body;

	const found = await Users.findBy({ username: user.username }).first();
	if (found) {
		res.status(400).json({ message: "This user already exists - please log in" });
		return;
	}

	const hash = bcrypt.hashSync(user.password, 10);

	user.password = hash;

	try {
		const newUser = await Users.add(user);
		res.status(201).json({ id: newUser.id, username: newUser.username });
	} catch (error) {
		res.status(500).json(error);
	}
});

// logins user
router.post("/login", async (req, res) => {
	let { username, password } = req.body;

	if (!username || !password) res.status(400).json({ message: "Credentials must be provided" });

	try {
		const user = await Users.findBy({ username }).first();

		if (user && bcrypt.compareSync(password, user.password)) {
			const token = generateToken(user);
			const access_token = await getAccessToken();
			res.status(200).json({
				message: `Authenticated successfully`,
				auth: { username: user.username, id: user.id, token },
				spotify: { access_token },
			});
		} else {
			res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
