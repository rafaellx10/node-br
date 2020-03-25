const { obterPessoas } = require("./service");

async function main() {
	try {
		const { results } = await obterPessoas(`a`);
		const pesos = results.map(item => parseInt(item.height));
		console.log("pesos ", pesos);
		//[20.3, 38.22, 79.0, 120.9] = SOMA DOS VALORES
		const total = pesos.reduce((anterior, proximo) => {
			return anterior + proximo;
		}, 0);

		console.log("total", total);
	} catch (err) {
		console.error(`DEU RUIM `, err);
	}
}

main();
