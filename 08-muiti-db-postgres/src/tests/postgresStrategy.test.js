const assert = require("assert");

const Postgres = require("./../db/strategies/postgres");
const Context = require("./../db/strategies/base/contextStrategy");

const context = new Context(new Postgres());
const MOCK_HEROI_CADASTRAR = {
	nome: "Gavião Negro",
	poder: "Flexas"
};

describe("Postgres Strategy", function() {
	this.timeout(Infinity);
	it("PostgresSQL Connection", async function() {
		const result = await context.isConnected();
		assert.equal(result, true);
	});
	it("Cadastrar", async function() {
		// const result = await context.create(MOCK_HEROI_CADASTRAR);
		const {
			dataValues: { nome, poder }
		} = await context.create(MOCK_HEROI_CADASTRAR);

		assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
	});
	it("Listar", async function() {
		const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
		// const posicaoZero = result[0]
		// console.log(result);
		delete result.id;
		assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
	});
});
