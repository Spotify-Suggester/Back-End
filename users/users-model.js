const db = require("../data/knexfile-config");

module.exports = {
	add,
	find,
	findBy,
	findById,
};

async function add(user) {
	const [id] = await db("user").insert(user, "id");

	return findById(id);
}

function find() {
	return db("user").select("id", "username", "department");
}

function findBy(filter) {
	return db("user").where(filter);
}

function findById(id) {
	return db("user").where({ id }).first();
}
