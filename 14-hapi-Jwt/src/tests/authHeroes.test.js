const assert = require("assert");
const api = require("../api");
let app = {};

describe("Auth test Suite", function () {
	this.beforeAll(async () => {
		app = await api;
	});

	it("Deve obter um token", async () => {
		const result = await app.inject({
			method: "POST",
			url: "/login",
			payload: {
				username: "rafael",
				password: "1234",
			},
		});

		const statusCode = result.statusCode;
		const dados = JSON.parse(result.payload);
		// console.log("dados", dados);

		// console.log(statusCode);
		assert.ok(statusCode === 200);
		assert.ok(dados.token.length > 10);
	});
});
