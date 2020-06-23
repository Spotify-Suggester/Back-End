const db = require("../data/knexfile-config");

module.exports = {
	add,
	find,
	findBy,
	findById,
	getRecommendedCount,
	updateRecommendedCount,
};

async function add(user) {
	const [id] = await db("users").insert(user, "id");

	return findById(id);
}

function find() {
	return db("users").select("id", "username", "department");
}

function findBy(filter) {
	return db("users").where(filter);
}

function findById(id) {
	return db("users").where({ id }).first();
}

async function getRecommendedCount(id) {
	const user = await findById(id);

	return user.recommended_request;
}

async function updateRecommendedCount(id) {
	const user = await findById(id);

	const [_, updatedCount] = await db("users").update(
		{
			recommended_request: user.recommended_request + 1,
		},
		["id", "recommended_count"]
	);

	return updatedCount;
}
