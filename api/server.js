require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const restricted = require("../auth/restricted");

const server = express();

// global middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", (req, res) => {
	res.status(200).send("<h1>Server running OK</h1>");
});

server.use("/api/auth", authRouter);
server.use("/api/users", restricted, usersRouter);

module.exports = server;
