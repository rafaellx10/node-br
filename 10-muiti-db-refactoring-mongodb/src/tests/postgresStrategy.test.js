const assert = require("assert");
const Postgres = require("./../db/strategies/postgres/postgres");
const HeroiSchema = require("./../db/strategies/postgres/schemas/heroiSchema");
const Context = require("./../db/strategies/base/contextStrategy");

const MOCK_HEROI_CADASTRAR = {
	nome: "Gavião Negro",
	poder: "Flexas",
};
const MOCK_HEROI_ATUALIZAR = {
	nome: "Batman",
	poder: "Dinheiro",
};
let context = {};

describe("Postgres Strategy", function () {
	this.timeout(Infinity);
	this.beforeAll(async function () {
		const connection = await Postgres.connect();
		const model = await Postgres.defineModel(connection, HeroiSchema);
		context = new Context(new Postgres(connection, model));
		await context.delete();
		await context.create(MOCK_HEROI_ATUALIZAR);
	});
	it("PostgresSQL Connection", async function () {
		const result = await context.isConnected();
		assert.equal(result, true);
	});
	it("Cadastrar", async function () {
		// const result = await context.create(MOCK_HEROI_CADASTRAR);
		const {
			dataValues: { nome, poder },
		} = await context.create(MOCK_HEROI_CADASTRAR);

		assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
	});
	it("Listar", async function () {
		const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
		// const posicaoZero = result[0]
		// console.log(result);
		delete result.id;
		assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
	});

	it("Atualizar", async function () {
		const [itemAtualizar] = await context.read({
			nome: MOCK_HEROI_ATUALIZAR.nome,
		});
		const novoItem = {
			...MOCK_HEROI_ATUALIZAR,
			nome: "Mulher Maravilha",
		};
		const [result] = await context.update(itemAtualizar.id, novoItem);
		const [itemAtualizado] = await context.read({ id: itemAtualizar.id });
		assert.deepEqual(result, 1);
		assert.deepEqual(itemAtualizado.nome, novoItem.nome);
		/**
		 * no Javascript temos uma tecnica chamada rest/spread
		 * que é um metodo usado para mergear objetos ou separar-lo
		 *
		 * {
		 *   nome: 'Batman',
		 * 	 poder: 'Dinheiro'
		 * }
		 * {
		 *   dataDeNascimento: '1998-01-01'
		 * }
		 *
		 * final
		 * {
		 *   nome: 'Batman',
		 * 	 poder: 'Dinheiro',
		 *   dataDeNascimento: '1998-01-01'
		 * }
		 */
	});
	it("Remover por ID", async function () {
		const [item] = await context.read({});
		const result = await context.delete(item.id);
		assert.deepEqual(result, 1);
	});
});
