const EventEmitter = require("events");

class MeuEmissor extends EventEmitter {}

const meuEmissor = new MeuEmissor();
const nomeEvento = "usuario:click";

meuEmissor.on(nomeEvento, function(click) {
	console.log("um usuário clicou ", click);
});

const stdin = process.openStdin();
stdin.addListener("data", function(value) {
	console.log(`você digitou: ${value.toString().trim()}`);
});
