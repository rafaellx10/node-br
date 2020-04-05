const BaseRoute = require("./base/baseRouter");
const joi = require("joi");

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
					failAction: (request, headers, erro) => {
						throw erro;
					},
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
}

module.exports = HeroRoutes;
