const db = require("../data/knexfile-config");

module.exports = {
	addSongToFavorites,
	findFavoriteSongs,
	findFavoriteSong,
	removeSongFromFavorites,
};

async function addSongToFavorites(songId, ownerId) {
	const found = await findFavoriteSong(Number(ownerId), songId);

	if (found.length === 0) {
		await db("favorite_songs").insert({ owner_id: Number(ownerId), song_id: songId });
		const favorites = await findFavoriteSongs(ownerId);
		console.log("addSong favorites: ", favorites);

		return {
			message: "Song added successfully",
			favorite_songs: favorites,
		};
	} else {
		const favorites = await findFavoriteSongs(ownerId);

		return {
			message: "Duplicate favorite - Song not added",
			favorite_songs: favorites,
		};
	}
}
async function removeSongFromFavorites(songId, ownerId) {
	const found = await findFavoriteSong(Number(ownerId), songId);

	if (found.length === 0) {
		const favorites = await findFavoriteSongs(ownerId);

		return {
			message: "Song does not exist in user favorites",
			favorite_songs: favorites,
		};
	} else {
		const deleted_song = await db("favorite_songs")
			.where(function () {
				this.where("song_id", songId);
			})
			.andWhere("owner_id", ownerId)
			.delete();

		const favorites = await findFavoriteSongs(ownerId);
		return {
			message: "Song removed from favorites",
			favorite_songs: favorites,
			deleted_song,
		};
	}
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
			"s.acousticness",
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
async function findFavoriteSong(ownerId, songId) {
	const favoriteSong = await db("favorite_songs")
		.where(function () {
			this.where("song_id", songId);
		})
		.andWhere("owner_id", ownerId);

	console.log("FAV SONG", favoriteSong);
	return favoriteSong;
}
