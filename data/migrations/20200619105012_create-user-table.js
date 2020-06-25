exports.up = function (knex) {
	return knex.schema
		.createTable("users", table => {
			table.increments("id");
			table.string("username", 128).notNullable().unique();
			table.string("password", 128).notNullable();
			table.integer("recommended_request").unsigned();
		})

		.createTable("songs", table => {
			table.string("id", 128).notNullable().unique();
			table.string("name", 128).notNullable().unique();
			table.string("artist", 128).notNullable();
			table.string("album", 128).notNullable();
			table.string("image_url", 128).notNullable();
			table.integer("popularity").unsigned();
			table.integer("duration_ms").unsigned();
			table.integer("key").unsigned();
			table.integer("mode").unsigned();
			table.integer("time_signature").unsigned();
			table.integer("danceability").unsigned();
			table.integer("energy").unsigned();
			table.integer("instrumentalness").unsigned();
			table.integer("liveness").unsigned();
			table.integer("loudness").unsigned();
			table.integer("speechiness").unsigned();
			table.integer("valence").unsigned();
			table.integer("tempo").unsigned();
		})

		.createTable("playlists", table => {
			table.increments("id");
			table.string("playlist_name", 128).notNullable();
			table
				.integer("owner_id")
				.unsigned()
				.notNullable()
				.references("users.id")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		})

		.createTable("playlist_songs", table => {
			table
				.integer("playlist_id")
				.unsigned()
				.notNullable()
				.references("playlists.id")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			table
				.string("song_id")
				.notNullable()
				.references("songs.id")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		})

		.createTable("favorite_songs", table => {
			table
				.integer("owner_id")
				.unsigned()
				.notNullable()
				.references("users.id")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			table
				.string("song_id")
				.notNullable()
				.references("songs.id")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("favorite_songs")
		.dropTableIfExists("playlist_songs")
		.dropTableIfExists("playlists")
		.dropTableIfExists("songs")
		.dropTableIfExists("users");
};
