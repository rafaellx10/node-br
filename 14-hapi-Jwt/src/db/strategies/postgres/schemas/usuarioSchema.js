const sequelize = require("sequelize");

const UsuarioSchema = {
	name: "usuarios",
	schema: {
		id: {
			type: sequelize.INTEGER,
			require: true,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: sequelize.STRING,
			unique: true,
			required: true,
		},
		password: {
			type: sequelize.STRING,
			required: true,
		},
	},
	options: {
		tableName: "tb_usuarios",
		freezeTableName: false,
		timestamps: false,
	},
};

module.exports = UsuarioSchema;
