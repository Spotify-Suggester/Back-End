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
			table.string("preview_url", 128);
			table.string("open_url", 128);
			table.decimal("popularity").unsigned();
			table.decimal("duration_ms").unsigned();
			table.decimal("key").unsigned();
			table.decimal("acousticness").unsigned();
			table.decimal("mode").unsigned();
			table.decimal("time_signature").unsigned();
			table.decimal("danceability").unsigned();
			table.decimal("energy").unsigned();
			table.decimal("instrumentalness").unsigned();
			table.decimal("liveness").unsigned();
			table.decimal("loudness");
			table.decimal("speechiness").unsigned();
			table.decimal("valence").unsigned();
			table.decimal("tempo").unsigned();
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
