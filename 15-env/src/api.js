const { config } = require("dotenv");
const { join } = require("path");
const { ok } = require("assert");

const env = process.env.NODE_ENV || "dev";
ok(env === "prod" || env === "dev", "A env é inválida, ou dev ou prod");

const configPath = join(__dirname, "./config", `.env.${env}`);
config({
	path: configPath,
});

const hapi = require("hapi");
const MongoDb = require("./db/strategies/mongodb/mongodb");
const Context = require("./db/strategies/base/contextStrategy");
const HeroisSchema = require("./db/strategies/mongodb/schemas/heroisSchemas");
const HeroRoutes = require("./routes/heroRoutes");
const AuthRoutes = require("./routes/authRoutes");
const UtilRoutes = require("./routes/utilRoutes")
const hapiSwagger = require("hapi-swagger");
const vision = require("vision");
const inert = require("inert");
const JWT_SECRET = process.env.JWT_SECRET;
const hapiJwt = require("hapi-auth-jwt2");

const usuarioSchema = require("./db/strategies/postgres/schemas/usuarioSchema");
const Postgres = require("./db/strategies/postgres/postgres");

const app = new hapi.Server({
	port: process.env.PORT,
});

function mapRoutes(instace, methods) {
	// ['list','create', 'update']
	// new HeroRoutes()['list']()
	// new HeroRoutes().list()

	return methods.map((method) => instace[method]());
}

async function main() {
	const connection = MongoDb.connect();
	const context = new Context(new MongoDb(connection, HeroisSchema));

	const connectionPostgres = await Postgres.connect();
	const model = await Postgres.defineModel(connectionPostgres, usuarioSchema);
	const contextPostgres = new Context(new Postgres(connectionPostgres, model));

	const swaggerOptions = {
		info: {
			title: "API Herois - #CursoNodeBR",
			version: "v1.0",
		},
	};
	// console.log(
	// 	"mapRoutes ======>",
	// 	mapRoutes(new HeroRoutes(context), HeroRoutes.method())
	// );
	await app.register([
		hapiJwt,
		vision,
		inert,
		{
			plugin: hapiSwagger,
			options: swaggerOptions,
		},
	]);
	app.auth.strategy("jwt", "jwt", {
		key: JWT_SECRET,
		// options: {
		// 	expiresIn: 20
		// },
		validate: async (dado, request) => {
			// verifica no banco se usuario continua ativo
			// verifica no banco se usuario continua pangando
			const [result] = await contextPostgres.read({
				username: dado.username.toLowerCase(),
				id: dado.id,
			});
			if (!result) return { isValid: false };

			return {
				isValid: true,
			};
		},
	});
	app.auth.default("jwt");
	app.route([
		...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
		...mapRoutes(
			new AuthRoutes(JWT_SECRET, contextPostgres),
			AuthRoutes.methods()
		),
		...mapRoutes(new UtilRoutes(), UtilRoutes.methods()),
	]);
	await app.start();
	console.log("Servidor rodando na porta ", app.info.port);

	return app;
}

module.exports = main();
