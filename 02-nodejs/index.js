/*
    0 - obter um usuário
    1 - preciso obter o número de telefone de um usuário a partir de seu id
    2 - obter o endereco do usuário pele id
*/

function obterUsuario() {
	setTimeout(function() {
		return {
			id: 1,
			nome: "Aladin",
			dataNascimento: new Data()
		};
	}, 1000);
}

function obterTelefone(idUsuario) {
	setTimeout(() => {
		return {
			telefone: "9 4029-2332",
			ddd: 11
		};
	}, 2000);
}

function obterEndereco(idUsuario) {}

const usuario = obterUsuario();
// const telefone = obterTelefone(usuario.telefone);

console.log("usuário ", usuario);
// console.log("telefone ", telefone);
