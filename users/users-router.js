const router = require("express").Router();
const axios = require("axios");

const Favorites = require("../users/favorite_songs-model");
const Songs = require("../songs/songs-model");
const Users = require("../users/users-model");
const getSong = require("../spotify/getSong");

// Get recommended
router.post("/:id/recommend", async (req, res) => {
	const { id } = req.params;
	const mood = req.body;

	try {
		const favorites = await Favorites.findFavoriteSongs(id);
		console.log(favorites);
		const DSModel = {
			favorite_songs: favorites,
			mood,
		};

		const recs = await axios
			.post("https://spotify-flask-1.herokuapp.com", { DSModel })
			.then(res => res)
			.catch(err => err);

		const recsExample = [
			"7GI1Weh21oGJYeSbrtOyR1",
			"6DavaRzYekSRYl0VMHnlwo",
			"4QuSTcFDbHPrDFzxFxeF5s",
			"0shBLNwbMS8i903cWwnwln",
			"5NRJrFPd3rfJRJUMWxV7zr",
		];

		const getData = async () => Promise.all(recsExample.map(songId => getSong(songId)));
		const recommended_songs = await getData()
			.then(data => data)
			.catch(err => err);

		res.status(200).json({ recommended_songs, DSModel });
	} catch (error) {
		res.status(500).json({ errorMessage: error });
	}
});

// Add song to user favorites
router.post("/:id/favorites", async (req, res) => {
	const songId = req.body.song_id;
	console.log("Song Id: ", songId);
	const { id } = req.params;

	if (!songId) res.status(400).json({ message: "Song id is required" });

	try {
		let favorite_songs;
		const found = await Songs.findById(songId);
		console.log("TEST");
		console.log("Found: ", found);
		if (!found) {
			const song = await getSong(songId)
				.then(res => res)
				.catch(err => err);

			console.log("Spotify Song: ", song);
			const newSong = await Songs.add(song);

			console.log("newSong: ", newSong);
			favorite_songs = await Favorites.addSongToFavorites(songId, id);

			console.log("favorite_songs: ", favorite_songs);

			res.status(200).json({
				...favorite_songs,
				message: favorite_songs.message,
				new_song: newSong,
			});
		} else {
			favorite_songs = await Favorites.addSongToFavorites(songId, id);
			res.status(200).json({ ...favorite_songs, message: favorite_songs.message });
		}
	} catch (err) {
		res.status(500).json(`Internal Server Error. Please try again`);
	}
});

// Remove song from user favorites
router.delete("/:id/favorites/:songId", async (req, res) => {
	const { id, songId } = req.params;

	try {
		const deleted = await Favorites.removeSongFromFavorites(songId, id);
		res.status(200).json(deleted);
	} catch (err) {
		res.status(500).json({ errorMessage: "Internal server error" });
	}
});

// Get user favorites
router.get("/:id/favorites", async (req, res) => {
	const { id } = req.params;
	const found = await Users.findById(id);

	if (!found) res.status(400).json({ message: "User not found" });

	try {
		const favorites = await Favorites.findFavoriteSongs(id);
		res.status(200).json({ favorite_songs: favorites });
	} catch (err) {
		res.status(500).json({ errorMessage: "Internal server error" });
	}
});

module.exports = router;
