const ICrud = require("./intefaces/interfaceCrud");
const Sequelize = require("sequelize");

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
		console.log("O item foi salvo no Postgres");
	}
	async difineModel() {
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
		await Herois.sync();
	}

	_connect() {
		this._driver = new Sequelize("heroes", "rafael", "admin", {
			host: "localhost",
			dialect: "postgres",
			quoteIndentifiers: false
		});
	}
}

module.exports = Postgres;
