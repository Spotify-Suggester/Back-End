const router = require("express").Router();
const axios = require("axios");

const Favorites = require("../users/favorite_songs-model");
const getSong = require("../spotify/getSong");

// get recommended
router.get("/:id/recommend", async (req, res) => {
	const { id } = req.params;

	try {
		const favorites = await Favorites.findFavoriteSongs(id);
		console.log(favorites);
		// const recs = await axios
		// 	.post("https://spotify-flask-1.herokuapp.com", { favorites })
		// 	.then(res => res)
		// 	.catch(err => err);

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

		res.status(200).json({ recommended_songs });
	} catch (error) {
		res.status(500).json({ errorMessage: error });
	}
});

module.exports = router;
