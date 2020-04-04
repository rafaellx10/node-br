const sequelize = require("sequelize");

const HeroiSchema = {
	name: "herois",
	schema: {
		id: {
			type: sequelize.INTEGER,
			require: true,
			primaryKey: true,
			autoIncrement: true,
		},
		nome: {
			type: sequelize.STRING,
			required: true,
		},
		poder: {
			type: sequelize.STRING,
			required: true,
		},
	},
	options: {
		tableName: "tb_herois",
		freezeTableName: false,
		timestamps: false,
	},
};

module.exports = HeroiSchema;
