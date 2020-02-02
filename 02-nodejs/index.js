/*
    0 - obter um usuário
    1 - preciso obter o número de telefone de um usuário a partir de seu id
		2 - obter o endereco do usuário pele id

		pending  => fulfilled  ||  Rejected
*/
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
	// quando der algum problema => reject(ERRO)
	// quando der success => RESOLVE
	return new Promise(function resolvePromise(resolve, reject) {
		setTimeout(function() {
			// return reject(new Error("Deu ruim de verdade!"));
			return resolve({
				id: 1,
				nome: "Aladin",
				dataNascimento: new Date()
			});
		}, 1000);
	});
}

function obterTelefone(idUsuario) {
	return new Promise(function resolverPromise(resolve, reject) {
		setTimeout(() => {
			return resolve({
				telefone: "9 4029-2332",
				ddd: 11
			});
		}, 2000);
	});
}

function obterEndereco(idUsuario, callback) {
	setTimeout(() => {
		return callback(null, {
			rua: "dos bobos",
			numero: 0
		});
	}, 2000);
}

function resolverUsuario(err, usuario) {
	console.log("usuario ", usuario);
}
main();

async function main() {
	try {
		console.time("medida-promise");
		const usuario = await obterUsuario();
		// const telefone = await obterTelefone(usuario.id);
		// const endereco = await obterEnderecoAsync(usuario.id);
		const resultado = await Promise.all([
			obterTelefone(usuario.id),
			obterEnderecoAsync(usuario.id)
		]);
		const endereco = resultado[1];
		const telefone = resultado[0];

		console.log(`
			Nome: ${usuario.nome}
			Endereco: ${endereco.rua}, ${endereco.numero}
			Telefone: (${telefone.ddd}) ${telefone.telefone}`);
		console.timeEnd("medida-promise");
	} catch (err) {
		console.error("Deu ruim ", err);
	}
}
