require("dotenv").config();
const express = require("express");
const request = require("request-promise");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
	res.status(200).send("<h1>Server running OK</h1>");
});

server.get("/api/login", async (req, res) => {
	const authOptions = {
		url: "https://accounts.spotify.com/api/token",
		form: {
			grant_type: "client_credentials",
		},
		headers: {
			Authorization:
				"Basic " +
				Buffer.from(
					process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
				).toString("base64"),
		},
		json: true,
	};

	const { access_token, refresh_token } = await request
		.post(authOptions)
		.then(res => res)
		.catch(err => err);

	res.status(200).json({ access_token });
});

module.exports = server;
