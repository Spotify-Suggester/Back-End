const server = require("../api/server");
const request = require("supertest");
const getAccessToken = require("./getAccessToken");

describe("getAccessToken", () => {
	test("should return token string", async () => {
		const response = await getAccessToken();
		expect(typeof response).toBe('string');
	});
});
