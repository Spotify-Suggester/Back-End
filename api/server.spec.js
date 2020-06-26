const server = require("./server.js");
const request = require("supertest");

describe("server.js", () => {
	test("should be the testing environment", () => {
		expect(process.env.DB_ENV).toBe("testing");
	});

	describe("GET /", () => {
		it("should return 200 OK", async () => {
			const res = await request(server).get("/");
			expect(res.status).toBe(200);
		});
		it("should be html", async () => {
			const res = await request(server).get("/");
			expect(res.type).toBe("text/html");
		});
	});
});
