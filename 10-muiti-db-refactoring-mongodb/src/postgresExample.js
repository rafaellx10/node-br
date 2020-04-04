// npm install sequelize
// npm install pg-hstore pg
const Sequelize = require("sequelize");
const driver = new Sequelize("heroes", "rafael", "admin", {
	host: "localhost",
	dialect: "postgres",
	quoteIndentifiers: false,
	operatorsAliases: false
});

async function main() {
	const Herois = driver.define(
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
	// await Herois.create({
	// 	nome: "Lanterna Verde",
	// 	poder: "Anel"
	// });

	// const result = await Herois.findAll({ raw: true });
	const result = await Herois.findAll({ raw: true, attributes: ["nome"] });
	console.log(result);
}

main();
