const db = require("../data/knexfile-config");

module.exports = {
	add,
	find,
	findBy,
	findById,
	findPlaylistSongs,
};

async function add(playlist) {
	const [id] = await db("playlist").insert(playlist, "id");

	return findById(id);
}

function find() {
	return db("playlist").select("id", "name");
}

function findBy(filter) {
	return db("playlist").where(filter);
}

function findById(id) {
	return db("playlist").where({ id }).first();
}

async function findPlaylistSongs(playlistId) {
	const playlistSongs = await db("playlist_songs as ps")
		.join("song as s", "ps.song_id", "s.id")
		.select(
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
		.where("ps.playlist_id", playlistId);

	return playlistSongs;
}
