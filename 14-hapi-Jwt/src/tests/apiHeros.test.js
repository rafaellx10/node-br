const assert = require("assert");
const api = require("../api");
let app = {};
const MOCK_HEROI_CADASTRAR = {
	nome: "Chapolin Colorado",
	poder: "Marreta Bionica",
};
const MOCK_HEROI_INICIAL = {
	nome: "Gavião Negro",
	poder: "Flexas",
};
let MOCK_ID = "";
describe("Suite de Testes da API Heroes", function () {
	this.beforeAll(async () => {
		app = await api;
		const result = await app.inject({
			method: "POST",
			url: "/herois",
			payload: JSON.stringify(MOCK_HEROI_INICIAL),
		});
		const dados = JSON.parse(result.payload);
		MOCK_ID = dados._id;
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
		// const NAME =  MOCK_HEROI_CADASTRAR.nome;
		const NAME = "Chapolin Colorado";
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
	it("Atualizar PATCH - /herois/:id", async () => {
		const _id = MOCK_ID;
		const expected = {
			poder: "Super-Mira",
		};
		const result = await app.inject({
			method: "PATCH",
			url: `/herois/${_id}`,
			payload: JSON.stringify(expected),
		});
		const statusCode = result.statusCode;
		const dados = JSON.parse(result.payload);

		assert.ok(statusCode === 200);
		assert.deepEqual(dados.message, "Heroi atualizado com sucesso!");
	});
	it("Atualizar PATCH - /herois/:id - não deve atualizar com ID incorreto!", async () => {
		const _id = `5e8a442156064f8132f07c2a`;
		const expected = {
			poder: "Super-Mira",
		};
		const result = await app.inject({
			method: "PATCH",
			url: `/herois/${_id}`,
			payload: JSON.stringify(expected),
		});
		const statusCode = result.statusCode;
		const dados = JSON.parse(result.payload);
		console.log(dados);
		const expectedError = {
			statusCode: 412,
			error: "Precondition Failed",
			message: "Id não encontrado no banco!",
		};
		console.log(dados.message);
		assert.ok(statusCode === 412);
		assert.deepEqual(dados, expectedError);
	});
	it("Remover DELETE - /herois/:id", async () => {
		const _id = MOCK_ID;
		const result = await app.inject({
			method: "DELETE",
			url: `/herois/${_id}`,
		});
		const statusCode = result.statusCode;
		const dados = JSON.parse(result.payload);

		assert.ok(statusCode === 200);
		assert.deepEqual(dados.message, "Heroi removido com sucesso!");
	});
	it("Remover DELETE - /herois/:id não deve remover", async () => {
		const _id = `5e8a442156064f8132f07c2a`;
		const result = await app.inject({
			method: "DELETE",
			url: `/herois/${_id}`,
		});
		const statusCode = result.statusCode;
		const dados = JSON.parse(result.payload);
		const expectedError = {
			statusCode: 412,
			error: "Precondition Failed",
			message: "Id não encontrado no banco!",
		};
		assert.ok(statusCode === 412);
		assert.deepEqual(dados, expectedError);
	});
	it("Remover DELETE - /herois/:id não deve remover com id inválido", async () => {
		const _id = "ID_INVALIDO";
		const result = await app.inject({
			method: "DELETE",
			url: `/herois/${_id}`,
		});
		const statusCode = result.statusCode;
		const dados = JSON.parse(result.payload);
		const expectedError = {
			error: "Internal Server Error",
			message: "An internal server error occurred",
			statusCode: 500,
		};
		assert.ok(statusCode === 500);
		assert.deepEqual(dados, expectedError);
	});
});
