const { deepEqual, ok } = require("assert");
const database = require("./database");

const DEFAULT_ITEM_CADASTRAR = { nome: "Flash", poder: "Speed", id: 1 };

describe("Suite de manipulação de Herois", () => {
	before(async () => {
		await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
	});

	it("deve pesquisar um heroi usando arquivo", async () => {
		const expected = DEFAULT_ITEM_CADASTRAR;
		const [resultado] = await database.listar(expected.id);
		// const posicaoUm = resultado[0]
		// ok(resultado, expected)
		// deepEqual(resultado, expected)
		deepEqual(resultado, expected);
	});

	it("deve cadastrar um heroi usando arquivos", async () => {
		const expected = DEFAULT_ITEM_CADASTRAR;
		// const expected = {
		// 	...DEFAULT_ITEM_CADASTRAR,
		// 	id:2,
		// 	nome: "Batman"
		// };
		const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
		const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);

		deepEqual(actual, expected);
	});

	it("deve remover um heroi por id", async () => {
		const expected = true;
		const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
		deepEqual(resultado, expected);
	});
});
