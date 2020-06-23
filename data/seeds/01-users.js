exports.seed = function (knex) {
	return knex("users").insert([
		{
			username: "test1",
			password: "password",
			recommended_request: 0,
		},
		{
			username: "test2",
			password: "password",
			recommended_request: 0,
		},
		{
			username: "test3",
			password: "password",
			recommended_request: 0,
		},
		{
			username: "test4",
			password: "password",
			recommended_request: 0,
		},
	]);
};
