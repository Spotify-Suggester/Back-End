const db = require("../data/knexfile-config");

module.exports = {
	add,
	find,
	findBy,
	findById,
};

async function add(song) {
	const [id] = await db("songs").insert(song, "id");

	return findById(id);
}

function find() {
	return db("songs").select(
		"id",
		"name",
		"artist",
		"album",
		"image_url",
		"popularity",
		"duration_ms",
		"key",
		"mode",
		"time_signature",
		"danceability",
		"energy",
		"instrumentalness",
		"liveness",
		"loudness",
		"speechiness",
		"valence",
		"tempo"
	);
}

function findBy(filter) {
	return db("songs").where(filter);
}

async function findById(id) {
	const song = await db("songs").where({ id }).first();

	return song;
}
