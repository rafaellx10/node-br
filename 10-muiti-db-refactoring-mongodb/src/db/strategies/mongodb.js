const ICrud = require("./intefaces/interfaceCrud");
const mongoose = require("mongoose");

const STATUS = {
	0: "Disconectado",
	1: "Conectado",
	2: "Conectando",
	3: "Disconectando",
};

class MongoDB extends ICrud {
	constructor() {
		super();
		this._driver = null;
		this._herois = null;
	}

	async isConnected() {
		const state = STATUS[this._driver.readyState];
		if (state === "Conectado") return state;
		if (state !== "Conectando") return state;

		await new Promise((resolve) => setTimeout(resolve, 1000));
		return STATUS[this._driver.readyState];
	}

	defineModel() {
		const heroiSchema = new mongoose.Schema({
			nome: {
				type: String,
				required: true,
			},
			poder: {
				type: String,
				required: true,
			},
			insertedAt: {
				type: Date,
				default: new Date(),
			},
		});
		this._herois = mongoose.model("herois", heroiSchema);
	}

	connect() {
		mongoose.connect(
			"mongodb://rafaelleal:minhasenhasecreta@localhost:27017/herois",
			{ useNewUrlParser: true },
			function (error) {
				if (!error) return;
				console.log("Falha na coneção!", error);
			}
		);
		const connection = mongoose.connection;
		this._driver = connection;
		this.defineModel();
		connection.once("open", () => console.log("Database rodando!"));
	}

	create(item) {
		return this._herois.create(item);
	}

	read(item, skip = 0, limit = 10) {
		return this._herois.find(item).skip(skip).limit(limit);
	}

	update(id, item) {
		return this._herois.updateOne({ _id: id }, { $set: item });
	}

	delete(id) {
		return this._herois.deleteOne({ _id: id });
	}
}

module.exports = MongoDB;
