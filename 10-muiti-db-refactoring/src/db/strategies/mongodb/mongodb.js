const ICrud = require("../intefaces/interfaceCrud");
const mongoose = require("mongoose");

const STATUS = {
	0: "Disconectado",
	1: "Conectado",
	2: "Conectando",
	3: "Disconectando",
};

class MongoDB extends ICrud {
	constructor(connection, schema) {
		super();
		this._connection = connection;
		this._schema = schema;
	}

	async isConnected() {
		const state = STATUS[this._connection.readyState];
		if (state === "Conectado") return state;
		if (state !== "Conectando") return state;

		await new Promise((resolve) => setTimeout(resolve, 1000));
		return STATUS[this._connection.readyState];
	}

	static connect() {
		mongoose.connect(
			"mongodb://rafaelleal:minhasenhasecreta@localhost:27017/herois",
			{ useNewUrlParser: true },
			function (error) {
				if (!error) return;
				console.log("Falha na coneção!", error);
			}
		);
		const connection = mongoose.connection;
		connection.once("open", () => console.log("Database rodando!"));
		return connection;
	}

	create(item) {
		return this._schema.create(item);
	}

	read(item, skip = 0, limit = 10) {
		return this._schema.find(item).skip(skip).limit(limit);
	}

	update(id, item) {
		return this._schema.updateOne({ _id: id }, { $set: item });
	}

	delete(id) {
		return this._schema.deleteOne({ _id: id });
	}
}

module.exports = MongoDB;
