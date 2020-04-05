const BaseRoute = require("./base/baseRouter");

class HeroRoutes extends BaseRoute {
	constructor(db) {
		super();
		this.db = db;
	}

	list() {
		return {
			path: "/herois",
			method: "GET",
			handler: (request, headers) => {
				try {
					const { skip, limit, nome } = request.query;
					let query = {};
					if (nome) query.nome = nome;

					if (isNaN(skip)) throw Error("O tipo do skip está incorreto");

					if (isNaN(limit)) throw Error("O tipo do limit está incorreto");

					return this.db.read(query, parseInt(skip), parseInt(limit));
				} catch (err) {
					console.log("Deu Ruim ", err);
					return "Erro interno no servidor";
				}
			},
		};
	}
}

module.exports = HeroRoutes;
