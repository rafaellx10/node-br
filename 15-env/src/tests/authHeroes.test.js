const assert = require("assert");
const api = require("../api");
const Context = require("./../db/strategies/base/contextStrategy");
const usuarioSchema = require("./../db/strategies/postgres/schemas/usuarioSchema");
const Postgres = require("./../db/strategies/postgres/postgres");
let app = {};
const USER = {
	username: "rafael",
	password: "Rafael@1234",
};
const USER_DB = {
	username: "rafael",
	password: "$2b$04$3z3LiO5dY.JEsJotJRUGTOwAv5FIARwSy6mHjuJAUoaep57PgV.2m",
};

describe("Auth test Suite", function () {
	this.beforeAll(async () => {
		app = await api;
		const connectionPostgres = await Postgres.connect();
		const model = await Postgres.defineModel(connectionPostgres, usuarioSchema);
		const postgres = new Context(new Postgres(connectionPostgres, model));
		await postgres.update(null, USER_DB, true);
	});

	it("Deve obter um token", async () => {
		const result = await app.inject({
			method: "POST",
			url: "/login",
			payload: USER,
		});
		// console.log("result", result.payload);

		const statusCode = result.statusCode;
		const dados = JSON.parse(result.payload);
		// console.log("dados", dados);

		// console.log(statusCode);
		assert.ok(statusCode === 200);
		assert.ok(dados.token.length > 10);
	});
	it("Deve retornar não autorizado ao tentar um login errado", async () => {
		const result = await app.inject({
			method: "POST",
			url: "/login",
			payload: {
				username: "rafaellx",
				password: "123",
			},
		});

		const statusCode = result.statusCode;
		const dados = JSON.parse(result.payload);
		// console.log("dados", dados);

		// console.log(statusCode);
		assert.deepEqual(statusCode, 401);
		assert.deepEqual(dados.error, "Unauthorized");
	});
});
