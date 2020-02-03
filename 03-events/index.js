const EventEmitter = require("events");

class MeuEmissor extends EventEmitter {}

const meuEmissor = new MeuEmissor();
const nomeEvento = "usuario:click";

meuEmissor.on(nomeEvento, function(click) {
	console.log("um usuário clicou ", click);
});

const stdin = process.openStdin();
function main() {
	return new Promise(function(resolve, reject) {
		stdin.addListener("data", function(value) {
			// console.log(`você digitou: ${value.toString().trim()}`);
			return resolve(value);
		});
	});
}
/*
	Usando Promise o Resultado so é mostrado no console.log somente uma unica vez,
	pois esse é o comportamento de uma promise, ser realisado somente uma vez...

	e os eventos são usado para ações contínuas.
*/
main().then(function(result) {
	console.log("resultado ", result.toString());
});
