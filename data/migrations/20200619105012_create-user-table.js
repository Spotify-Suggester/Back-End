exports.up = function (knex) {
	return knex.schema
		.createTable("user", table => {
			table.increments("id");
			table.string("username", 128).notNullable();
			table.string("password", 128).notNullable();
		})
		.createTable("playlist", table => {
			table.increments("id");
			table.string("name", 128).notNullable();
		})

		.createTable("user_playlists", table => {
			table
				.integer("playlist_id")
				.unsigned()
				.notNullable()
				.references("playlist.id")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			table
				.integer("owner_id")
				.unsigned()
				.notNullable()
				.references("user.id")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
		})
		.createTable("favorites", table => {
			table.increments("id");
			table
				.integer("owner_id")
				.unsigned()
				.notNullable()
				.references("user.id")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
		})
		.createTable("song", table => {
			table.string("id", 128).notNullable().unique();
			table.string("name", 128).notNullable().unique();
			table.string("artist", 128).notNullable();
			table.string("album", 128).notNullable();
			table.integer("popularity").unsigned().notNullable();
			table.integer("duration_ms").unsigned().notNullable();
			table.integer("key").unsigned().notNullable();
			table.integer("mode").unsigned().notNullable();
			table.integer("time_signature").unsigned().notNullable();
			table.integer("danceability").unsigned().notNullable();
			table.integer("energy").unsigned().notNullable();
			table.integer("instrumentalness").unsigned().notNullable();
			table.integer("liveness").unsigned().notNullable();
			table.integer("loudness").unsigned().notNullable();
			table.integer("speechiness").unsigned().notNullable();
			table.integer("valence").unsigned().notNullable();
			table.integer("tempo").unsigned().notNullable();
		})
		.createTable("playlist_songs", table => {
			table
				.integer("playlist_id")
				.references("playlist.id")
				.unsigned()
				.notNullable()
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			table
				.integer("song_id")
				.references("song.id")
				.unsigned()
				.notNullable()
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		})
		.createTable("favorite_songs", table => {
			table
				.integer("favorites-id")
				.references("favorites.id")
				.unsigned()
				.notNullable()
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			table
				.integer("song_id")
				.references("song.id")
				.unsigned()
				.notNullable()
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("favorite_songs")
		.dropTableIfExists("playlist_songs")
		.dropTableIfExists("song")
		.dropTableIfExists("favorites")
		.dropTableIfExists("user_playlists")
		.dropTableIfExists("playlist")
		.dropTableIfExists("user");
};
