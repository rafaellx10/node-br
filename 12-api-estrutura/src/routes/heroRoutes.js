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
				return this.db.read();
			},
		};
	}
}

module.exports = HeroRoutes;
