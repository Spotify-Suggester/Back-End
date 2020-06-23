const db = require("../data/knexfile-config");

module.exports = {
	add,
	find,
	getFavoriteSong,
	findBy,
	findById,
	getRecommendedCount,
	updateRecommendedCount,
};

async function add(user) {
	const [id] = await db("users").insert(user, "id");

	return findById(id);
}

function find() {
	return db("users").select("id", "username", "department");
}



function findBy(filter) {
	return db("users").where(filter);
}

function findById(id) {
	return db("users").where({ id }).first();
}

function getFavoriteSong(id){
	return db('favorite_songs as fs')
	.join('songs as s','s.id','fs.song_id')
	.join('users as u','u.id','fs.owner_id')
	.select(
		'u.username',
		"s.id",
		"s.name",
		"s.artist",
		"s.album",
		"s.popularity",
		"s.duration_ms",
		"s.key",
		"s.mode",
		"s.time_signature",
		"s.danceability",
		"s.energy",
		"s.instrumentalness",
		"s.liveness",
		"s.loudness",
		"s.speechiness",
		"s.valence",
		"s.tempo"
	)
	.where('fs.owner_id',id)
}

async function getRecommendedCount(id) {
	const user = await findById(id);

	return user.recommended_request;
}

async function updateRecommendedCount(id) {
	const user = await findById(id);

	const [_, updatedCount] = await db("users").update(
		{
			recommended_request: user.recommended_request + 1,
		},
		["id", "recommended_count"]
	);

	return updatedCount;
}
