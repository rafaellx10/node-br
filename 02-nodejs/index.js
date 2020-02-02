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

const usuarioPromise = obterUsuario();

usuarioPromise
	.then(function(usuario) {
		return obterTelefone(usuario.id).then(function resolverTelefone(result) {
			return {
				usuario: {
					nome: usuario.nome,
					id: usuario.id
				},
				telefone: {
					ddd: result.ddd,
					telefone: result.telefone
				}
			};
		});
	})
	.then(function(result) {
		const endereco = obterEnderecoAsync(result.usuario.id);
		// return endereco;
	})
	.then(function(result) {
		console.log("resultado: ", result);
	})
	.catch(function(err) {
		console.error("Deu ruim ", err);
	});

// const usuario = obterUsuario();
// const telefone = obterTelefone(usuario.telefone);

// console.log("usuário ", usuario);
// console.log("telefone ", telefone);
