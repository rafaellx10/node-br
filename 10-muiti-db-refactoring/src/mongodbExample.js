// npm install mongooose
const mongoose = require("mongoose");

mongoose.connect(
	"mongodb://rafaelleal:minhasenhasecreta@localhost:27017/herois",
	{ useNewUrlParser: true },
	function(error) {
		if (!error) return;
		console.log("Falha na coneção!", error);
	}
);

const connection = mongoose.connection;

//function nomedafuncao(){}
// const minhaFuncao = function() {};
// const minhaFuncao = () => {};
// const minhaFuncao = params => console.log(params);

connection.once("open", () => console.log("Database rodando!"));
// setTimeout(() => {
// 	const state = connection.readyState;
// 	console.log("state: ", state);
// }, 2000);

/**
 * 0: Disconectado
 * 1: Conectado
 * 2: Conectando
 * 3: Disconectando
 */

const heroiSchema = new mongoose.Schema({
	nome: {
		type: String,
		required: true
	},
	poder: {
		type: String,
		required: true
	},
	insertedAt: {
		type: Date,
		default: new Date()
	}
});
const model = mongoose.model("herois", heroiSchema);

async function main() {
	const resultCadastrar = await model.create({
		nome: "Batman",
		poder: "DInheiro"
	});
	console.log("result cadastrar ", resultCadastrar);

	const listItems = await model.find();
	console.log("items: ", listItems);
}

main();
