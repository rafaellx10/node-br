const ICrud = require("../intefaces/interfaceCrud");
const Sequelize = require("sequelize");

class Postgres extends ICrud {
	constructor(connection, schema) {
		super();
		this._connection = connection;
		this._schema = schema;
	}

	async isConnected() {
		try {
			await this._connection.authenticate();
			return true;
		} catch (err) {
			console.error("Fail! ", err);
			return false;
		}
	}

	create(item) {
		return this._schema.create(item, { raw: true });
	}

	async read(item = {}) {
		return this._schema.findAll({ where: item, raw: true });
	}

	async update(id, item) {
		return await this._schema.update(item, { where: { id: id } });
		// const result = await this._schema.update(item, { where: { id: id } });
		// console.log("update:", result);
		// return result;
	}

	async delete(id) {
		// const query = id ? { id: id } : {};
		const query = id ? { id } : {};
		return this._schema.destroy({ where: query });
	}

	static async defineModel(connection, schema) {
		const model = connection.define(schema.name, schema.schema, schema.options);
		await model.sync();
		return model;
	}

	static async connect() {
		const connection = new Sequelize("heroes", "rafael", "admin", {
			host: "localhost",
			dialect: "postgres",
			quoteIndentifiers: false,
			logging: false,
		});
		return connection;
	}
}

module.exports = Postgres;
