const BaseRoute = require("./base/baseRouter");
const joi = require("joi");
const boom = require("boom");
const jwt = require("jsonwebtoken");
const passwordHelper = require("./../helpers/passwordHelper");
const failAction = (request, headers, erro) => {
	throw erro;
};
const USER = {
	username: "rafael",
	password: "1234",
};
class AuthRoutes extends BaseRoute {
	constructor(secret, db) {
		super();
		this.secret = secret;
		this.db = db;
	}
	login() {
		return {
			path: "/login",
			method: "POST",
			config: {
				auth: false,
				tags: ["api"],
				description: "Obter token",
				notes: "Fazer login com user e senha do banco",
				validate: {
					failAction,
					payload: {
						username: joi.string().required(),
						password: joi.string().required(),
					},
				},
			},
			handler: async (request) => {
				const { username, password } = request.payload;

				const [usuario] = await this.db.read({
					username: username.toLowerCase(),
				});

				if (!usuario)
					return boom.unauthorized("O Usuário informado não existe");

				const match = await passwordHelper.comparePassword(
					password,
					usuario.password
				);

				if (!match) boom.unauthorized("O usúario ou senha invalidos!");
				// if (
				// 	username.toLowerCase() !== USER.username ||
				// 	password !== USER.password
				// )
				// 	return boom.unauthorized();

				const token = jwt.sign(
					{
						username: username,
						id: usuario.id,
					},
					this.secret
				);
				return {
					token,
				};
			},
		};
	}
}

module.exports = AuthRoutes;
