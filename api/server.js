require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("../auth/auth-router");
const { findPlaylistSongs } = require("../playlists/playlists-model");

const server = express();

// global middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", (req, res) => {
	res.status(200).send("<h1>Server running OK</h1>");
});

server.use("/api/auth", authRouter);

server.get("/playlist/:id/songs", async (req, res) => {
	const { id } = req.params;
	try {
		const songs = await findPlaylistSongs(id);
		res.status(200).json(songs);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = server;
