const BaseRoute = require("./base/baseRouter");
const joi = require("joi");
const failAction = (request, headers, erro) => {
	throw erro;
};
class HeroRoutes extends BaseRoute {
	constructor(db) {
		super();
		this.db = db;
	}

	list() {
		return {
			path: "/herois",
			method: "GET",
			config: {
				validate: {
					// payload => body da requisição
					// headers => cabeçalho da requisição
					// params => na URL :id
					// query => ?skip=0&limit=10
					failAction,
					query: joi.object({
						skip: joi.number().integer().default(0),
						limit: joi.number().integer().default(10),
						nome: joi.string().min(3).max(40),
					}),
				},
			},
			handler: (request, headers) => {
				try {
					const { skip, limit, nome } = request.query;
					const query = nome ? { nome: { $regex: `.*${nome}*.` } } : {};
					return this.db.read(query, skip, limit);
				} catch (err) {
					console.log("Deu Ruim ", err);
					return "Erro interno no servidor";
				}
			},
		};
	}

	create() {
		return {
			path: "/herois",
			method: "POST",
			config: {
				validate: {
					failAction,
					payload: {
						nome: joi.string().required().min(3).max(40),
						poder: joi.string().required().min(2).max(40),
					},
				},
			},
			handler: async (request) => {
				try {
					const { nome, poder } = request.payload;
					const result = await this.db.create({ nome, poder });
					console.log("Result ", result);
					return {
						message: "Heroi cadastrado com sucesso!",
						_id: result._id,
					};
				} catch (err) {
					console.log("Deu ruim ", err);
					return "Internal Error!";
				}
			},
		};
	}

	update() {
		return {
			path: `/herois/{id}`,
			method: "PATCH",
			config: {
				validate: {
					params: {
						id: joi.string().required(),
					},
					payload: {
						nome: joi.string().min(3).max(40),
						poder: joi.string().min(2).max(40),
					},
				},
			},
			handler: async (request) => {
				try {
					// console.log("request: ", request);
					const { id } = request.params;
					// console.log("id: ", id);
					const payload = request.payload;
					// console.log("payload: ", payload);
					const dadosString = JSON.stringify(payload);
					const dados = JSON.parse(dadosString);

					const result = await this.db.update(id, dados);
					console.log("result", result);
					if (result.nModified !== 1)
						return { message: "Não foi possível atualizar!" };
					return {
						message: "Heroi atualizado com sucesso!",
					};
				} catch (err) {
					console.error("Deu ruim ", err);
					return `Internal Error!`;
				}
			},
		};
	}
}

module.exports = HeroRoutes;
