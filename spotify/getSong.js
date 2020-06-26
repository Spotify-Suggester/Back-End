const axios = require("axios");
const getAccessToken = require("./getAccessToken");

const songPromise = async songId => {
	const access_token = await getAccessToken();
	const withAccessToken = () =>
		axios.create({
			headers: {
				authorization: `Bearer ${access_token}`,
			},
		});

	const song = await withAccessToken()
		.get(`https://api.spotify.com/v1/tracks/${songId}`)
		.then(res => res.data)
		.catch(err => err);

	const songFeatures = await withAccessToken()
		.get(`https://api.spotify.com/v1/audio-features/${songId}`)
		.then(res => res.data)
		.catch(err => err);

	const songModel = {
		id: song.id,
		name: song.name,
		artist: song.artists[0].name,
		album: song.album.name,
		image_url: song.album.images[0].url,
		popularity: song.popularity,
		duration_ms: songFeatures.duration_ms,
		key: songFeatures.key,
		acousticness: songFeatures.acousticness,
		mode: songFeatures.mode,
		time_signature: songFeatures.time_signature,
		danceability: songFeatures.danceability,
		energy: songFeatures.energy,
		instrumentalness: songFeatures.instrumentalness,
		liveness: songFeatures.liveness,
		loudness: songFeatures.loudness,
		speechiness: songFeatures.speechiness,
		valence: songFeatures.valence,
		tempo: songFeatures.tempo,
	};

	console.log(songFeatures);

	return Promise.resolve(songModel);
};

// Returns a promise, must use .then to retrieve song object
// If you want to pass in an array of songs, see user-router.js line 27 as an example
const getSong = songId => songPromise(songId);

module.exports = getSong;
