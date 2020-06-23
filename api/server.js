require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("../auth/auth-router");
const userRouter = require('../users/users-router');
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
server.use("/api/users", userRouter);



module.exports = server;
