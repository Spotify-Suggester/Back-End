exports.seed = function (knex) {
	return knex("users").insert([
		{
			username: "test1",
			password: "password",
		},
		{
			username: "test2",
			password: "password",
		},
		{
			username: "test3",
			password: "password",
		},
		{
			username: "test4",
			password: "password",
		},
	]);
};
