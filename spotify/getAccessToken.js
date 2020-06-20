const request = require("request-promise");

module.exports = async function getAccessToken() {
	const authOptions = {
		url: "https://accounts.spotify.com/api/token",
		form: {
			grant_type: "client_credentials",
		},
		headers: {
			Authorization:
				"Basic " +
				Buffer.from(
					process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
				).toString("base64"),
		},
		json: true,
	};

	const { access_token } = await request
		.post(authOptions)
		.then(res => res)
		.catch(err => err);

	return access_token;
};
