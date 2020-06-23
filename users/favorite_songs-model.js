const db = require("../data/knexfile-config");

module.exports = {
	addSongToFavorites,
	findFavoriteSongs,
};

async function addSongToFavorites(songId, ownerId) {
	await db("favorite_songs").insert({ owner_id: ownerId, song_id: songId });

	return findFavoriteSongs(ownerId);
}

async function findFavoriteSongs(userId) {
	const favoriteSongs = await db("favorite_songs as fs")
		.join("songs as s", "fs.song_id", "s.id")
		.select(
			"s.id",
			"s.name",
			"s.artist",
			"s.album",
			"s.image_url",
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
		.where("fs.owner_id", userId);

	return favoriteSongs;
}
