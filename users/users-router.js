const router = require("express").Router();
const axios = require("axios");

const Favorites = require("../users/favorite_songs-model");
const Songs = require("../songs/songs-model");
const Users = require("../users/users-model");
const getSong = require("../spotify/getSong");
const getAccessToken = require("../spotify/getAccessToken");
const qs = require("querystring");

// Get recommended
router.post("/:id/recommend", async (req, res) => {
	const { id } = req.params;
	const mood = req.body;

	const access_token = await getAccessToken();
	const withAccessToken = () =>
		axios.create({
			headers: {
				authorization: `Bearer ${access_token}`,
			},
		});

	if (!mood) {
		res.status(400).json({ message: "Mood parameters required" });
		return;
	}

	try {
		const favorites = await Favorites.findFavoriteSongs(id);
		const favsTrackIdsStr = favorites
			.map(fav => fav.id)
			.slice(0, 5)
			.join(",");

		const recModel = {
			target_danceability: mood.danceability,
			target_energy: mood.energy,
			target_liveness: mood.liveness,
			target_speechiness: mood.speechiness,
			target_valence: mood.valence,
			target_acousticness: mood.acousticness,
			target_instrumentalness: mood.instrumentalness,
			target_tempo: mood.tempo,
			seed_tracks: favsTrackIdsStr,
			limit: 15,
		};

		const recQs = qs.stringify(recModel);

		const recSongs = await withAccessToken()
			.get(`https://api.spotify.com/v1/recommendations?${recQs}`)
			.then(res => res)
			.catch(err => err);

		const getData = async () =>
			Promise.all(recSongs.data.tracks.map(track => getSong(track.id)));

		const recommended_songs = await getData()
			.then(data => data)
			.catch(err => err);

		res.status(200).json({ recommended_songs });
	} catch (error) {
		res.status(500).json({ errorMessage: error });
	}
});

// Add song to user favorites
router.post("/:id/favorites", async (req, res) => {
	const songId = req.body.song_id;
	const { id } = req.params;

	if (!songId) res.status(400).json({ message: "Song id is required" });

	try {
		let favorite_songs;
		const found = await Songs.findById(songId);
		if (!found) {
			const song = await getSong(songId)
				.then(res => res)
				.catch(err => err);

			const newSong = await Songs.add(song);

			favorite_songs = await Favorites.addSongToFavorites(songId, id);

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
