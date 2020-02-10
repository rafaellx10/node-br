const { obterPessoas } = require("./service");

/*
	const item {
		nome: "Rafael",
		idade: 12
	}

	const {nome , idade} = item

	console.log(nome,idade)
*/
Array.prototype.meuFilter = function(callback) {
	const lista = [];
	for (index in this) {
		const item = this[index];
		const result = callback(item, index, this);
		// 0, "", null, undefined === false
		if (!result) continue;
		lista.push(item);
	}
	return lista;
};

async function main() {
	try {
		const { results } = await obterPessoas(`a`);
		// const familiarLars = results.filter(function(item) {
		// 	// por padrão precisa retornar um boolean
		// 	// para informar se deve manter ou remover da lista
		// 	// false > remove da lista
		// 	// true > mantem
		// 	// nao encontrou = -1
		// 	// encotrou = posicaoNoArray
		// 	const result = item.name.toLowerCase().indexOf(`lars`) !== -1;
		// 	return result;
		// });

		const familiarLars = results.meuFilter((item, index, lista) => {
			console.log(`index: ${index}`, lista.length);
			return item.name.toLowerCase().indexOf("lars") !== -1;
		});
		const names = familiarLars.map(pessoa => pessoa.name);
		console.log(names);
	} catch (err) {
		console.error("Deu ruim", err);
	}
}

main();
