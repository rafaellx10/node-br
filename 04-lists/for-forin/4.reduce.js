const { obterPessoas } = require("./service");

Array.prototype.meuReduce = function(callback, valorInicial) {
	let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];

	for (let index = 0; index <= this.length - 1; index++) {
		valorFinal = callback(valorFinal, this[index], this);
	}

	return valorFinal;
};

async function main() {
	try {
		// const { results } = await obterPessoas(`a`);
		// const pesos = results.map(item => parseInt(item.height));
		// console.log("pesos ", pesos);
		//[20.3, 38.22, 79.0, 120.9] = SOMA DOS VALORES
		// const total = pesos.reduce((anterior, proximo) => {
		// 	return anterior + proximo;
		// }, 0);
		const minhaLista = [
			["Erick", "Wendel"],
			["NodeBR", "Nerdzão"]
		];
		const total = minhaLista
			.meuReduce((anterior, proximo) => {
				return anterior.concat(proximo);
			}, [])
			.join(", ");
		console.log("total", total);
	} catch (err) {
		console.error(`DEU RUIM `, err);
	}
}

main();
