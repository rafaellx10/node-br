/*
    0 - obter um usuário
    1 - preciso obter o número de telefone de um usuário a partir de seu id
    2 - obter o endereco do usuário pele id
*/

function obterUsuario(callback) {
	setTimeout(function() {
		return callback(null, {
			id: 1,
			nome: "Aladin",
			dataNascimento: new Date()
		});
	}, 1000);
}

function obterTelefone(idUsuario, callback) {
	setTimeout(() => {
		return callback(null, {
			telefone: "9 4029-2332",
			ddd: 11
		});
	}, 2000);
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

obterUsuario(function resolverUsuario(err1, usuario) {
	// null || "" || 0 === false
	if (err1) {
		console.error("Erro em usuário ", err1);
		return;
	}
	obterTelefone(usuario.id, function resolverTelefone(err2, telefone) {
		if (err2) {
			console.error("Erro em telefone ", err2);
			return;
		}
		obterEndereco(usuario.id, function resolverEndereco(err3, endereco) {
			if (err3) {
				console.error("Erro em endereco ", err3);
				return;
			}

			console.log(`
				Nome: ${usuario.nome},
				endereco: ${endereco.rua},${endereco.numero},
				Telefone: (${telefone.ddd}) ${telefone.telefone}
			`);
		});
	});
});

// const usuario = obterUsuario();
// const telefone = obterTelefone(usuario.telefone);

// console.log("usuário ", usuario);
// console.log("telefone ", telefone);
