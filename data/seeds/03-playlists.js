exports.seed = function (knex) {
	return knex("playlists").insert([
		{
			playlist_name: "playlist1",
			owner_id: 1,
		},
		{
			playlist_name: "playlist2",
			owner_id: 1,
		},
		{
			playlist_name: "playlist3",
			owner_id: 2,
		},
		{
			playlist_name: "playlist4",
			owner_id: 2,
		},
		{
			playlist_name: "playlist5",
			owner_id: 3,
		},
		{
			playlist_name: "playlist6",
			owner_id: 3,
		},
		{
			playlist_name: "playlist7",
			owner_id: 4,
		},
		{
			playlist_name: "playlist8",
			owner_id: 4,
		},
	]);
};
