exports.seed = function (knex) {
	return knex("playlists").insert([
		{
			name: "playlist1",
			owner_id: 1,
		},
		{
			name: "playlist2",
			owner_id: 1,
		},
		{
			name: "playlist3",
			owner_id: 2,
		},
		{
			name: "playlist4",
			owner_id: 2,
		},
		{
			name: "playlist5",
			owner_id: 3,
		},
		{
			name: "playlist6",
			owner_id: 3,
		},
		{
			name: "playlist7",
			owner_id: 4,
		},
		{
			name: "playlist8",
			owner_id: 4,
		},
	]);
};
