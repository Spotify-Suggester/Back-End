const request = require("supertest");
const server = require("../api/server");
const db = require("../data/knexfile-config");

describe("users-router", () => {
	describe("POST /:id/recommend", () => {
		let user;

		it("should return status code 200 OK", async () => {
			const serverRes = await request(server)
				.post("/api/users/1/recommend")
				.set("Authorization", user.auth.token);

			expect(serverRes.status).toBe(200);
		});

		it("should return recommended list", async () => {
			const serverRes = await request(server)
				.post("/api/users/1/recommend")
				.set("Authorization", user.auth.token);

			expect(serverRes.body).toMatchObject({ recommended_songs: {} });
		});

		beforeAll(async () => {
			await db("users").truncate();

			const newUser = { username: "gsgarces", password: "password" };
			const res = await request(server).post("/api/auth/register").send(newUser);
			user = res.body;
		});
	});

	describe("POST /:id/favorites", () => {
		let user;

		it("should return 400 when no song id is provided", async () => {
			const serverRes = await request(server);
		});

		beforeAll(async () => {
			await db("users").truncate();

			const newUser = { username: "gsgarces", password: "password" };
			const res = await request(server).post("/api/auth/register").send(newUser);
			user = res.body;
		});
	});
});
