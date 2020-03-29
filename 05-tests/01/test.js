const assert = require("assert");
const { obterPessoas } = require("./service");

// assert.ok(true);

describe("Star Wars Tests", function() {
	it("deve buscar 0 R2D2 com o formato correto", async () => {
		const expected = [{ nome: "R2-D2", peso: "96" }];
		const nomeBase = `r2-d2`;
		const resultado = await obterPessoas(nomeBase);
		console.log(resultado);
		assert.deepEqual(resultado, expected);
	});
});
