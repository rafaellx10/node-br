const assert = require("assert");
const api = require("../api");
let app = {};
const MOCK_HEROI_CADASTRAR = {
	nome: "Chapolin Colorado",
	poder: "Marreta Bionica",
};
describe.only("Suite de Testes da API Heroes", function () {
	this.beforeAll(async () => {
		app = await api;
	});

	it("Listar herois em /herois", async () => {
		const result = await app.inject({
			method: "GET",
			url: "/herois?skip=0&limit=10",
		});
		const dados = JSON.parse(result.payload);
		const statusCode = result.statusCode;
		// console.log("result: ", result);
		assert.deepEqual(statusCode, 200);
		assert.ok(Array.isArray(dados));
	});
	it("Listar /herois - deve retornar somente 3 registros", async () => {
		const TAMANHO_LIMITE = 3;
		const result = await app.inject({
			method: "GET",
			url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
		});
		const dados = JSON.parse(result.payload);
		console.log("quantidade: ", dados.length);
		const statusCode = result.statusCode;
		assert.deepEqual(statusCode, 200);
		assert.ok(dados.length === TAMANHO_LIMITE);
	});
	it("Listar /herois - deve retornar um erro com limit incorreto", async () => {
		const TAMANHO_LIMITE = "AEE";
		const result = await app.inject({
			method: "GET",
			url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
		});
		const statusCode = result.statusCode;
		const errorResult = {
			statusCode: 400,
			error: "Bad Request",
			message: 'child "limit" fails because ["limit" must be a number]',
			validation: {
				source: "query",
				keys: ["limit"],
			},
		};
		assert.deepEqual(result.statusCode, 400);
		assert.deepEqual(result.payload, JSON.stringify(errorResult));
	});
	it("Listar /herois - deve filtrar um item", async () => {
		const TAMANHO_LIMITE = 1000;
		const NAME = "Batman";
		const result = await app.inject({
			method: "GET",
			url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`,
		});
		const dados = JSON.parse(result.payload);
		const statusCode = result.statusCode;
		assert.deepEqual(statusCode, 200);
		assert.ok(dados[0].nome === NAME);
	});
	it("Cadastrar POST - /herois", async () => {
		const result = await app.inject({
			method: "POST",
			url: `/herois`,
			payload: MOCK_HEROI_CADASTRAR,
		});
		const statusCode = result.statusCode;
		const { message, _id } = JSON.parse(result.payload);
		console.log("_id: ", _id);
		assert.ok(statusCode === 200);
		assert.notStrictEqual(_id, undefined);
		assert.deepEqual(message, "Heroi cadastrado com sucesso!");
	});
});
