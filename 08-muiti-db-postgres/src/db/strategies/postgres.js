const ICrud = require("./intefaces/interfaceCrud");
const { Sequelize } = require("sequelize");

class Postgres extends ICrud {
	constructor() {
		super();
		this._driver = null;
		this._herois = null;
		this._connect();
	}

	async isConnected() {
		try {
			await this._driver.authenticate();
			return true;
		} catch (err) {
			console.error("Fail! ", err);
			return false;
		}
	}

	create(item) {
		return this._herois.create(item, { raw: true });
	}

	async read(item = {}) {
		return this._herois.findAll({ where: item, raw: true });
	}

	async update(id, item) {
		return await this._herois.update(item, { where: { id: id } });
		// const result = await this._herois.update(item, { where: { id: id } });
		// console.log("update:", result);
		// return result;
	}

	async delete(id) {
		// const query = id ? { id: id } : {};
		const query = id ? { id } : {};
		return this._herois.destroy({ where: query });
	}

	async defineModel() {
		this._herois = this._driver.define(
			"herois",
			{
				id: {
					type: Sequelize.INTEGER,
					require: true,
					primaryKey: true,
					autoIncrement: true
				},
				nome: {
					type: Sequelize.STRING,
					required: true
				},
				poder: {
					type: Sequelize.STRING,
					required: true
				}
			},
			{
				tableName: "tb_herois",
				freezeTableName: false,
				timestamps: false
			}
		);
		await this._herois.sync();
	}

	_connect() {
		this._driver = new Sequelize("heroes", "rafael", "admin", {
			host: "localhost",
			dialect: "postgres",
			quoteIndentifiers: false
		});
		this.defineModel();
	}
}

module.exports = Postgres;
