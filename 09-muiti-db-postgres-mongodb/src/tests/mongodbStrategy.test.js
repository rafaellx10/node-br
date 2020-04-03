const assert = require("assert");

const MongoDb = require("./../db/strategies/mongodb");
const Context = require("./../db/strategies/base/contextStrategy");

const context = new Context(new MongoDb());
const MOCK_HEROI_CADASTRAR = {
	nome: "Mulher Maravilha",
	poder: "Laço"
};
const MOCK_HEROI_DEFAULT = {
	nome: `Homem Aranha-${Date.now()}`,
	poder: "Teia"
};
describe("MongoDB Suite de testes", function() {
	this.beforeAll(async () => {
		await context.connect();
		await context.create(MOCK_HEROI_DEFAULT);
	});
	it("Verificar conexão", async () => {
		const result = await context.isConnected();
		const expected = "Conectado";

		assert.deepEqual(result, expected);
	});

	it("Cadastrar", async () => {
		const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
		// const result = await context.create(MOCK_HEROI_CADASTRAR);
		// console.log("result ", result);
		assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
	});

	it("Listar1", async () => {
		const [{ nome, poder }] = await context.read({
			nome: MOCK_HEROI_CADASTRAR.nome
		});
		const result = {
			nome,
			poder
		};
		assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
	});
	it("Listar2", async () => {
		const [{ nome, poder }] = await context.read({
			nome: MOCK_HEROI_DEFAULT.nome
		});
		const result = {
			nome,
			poder
		};
		assert.deepEqual(result, MOCK_HEROI_DEFAULT);
	});
});
