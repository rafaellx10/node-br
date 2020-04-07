const assert = require("assert");
const PasswordHelper = require("../helpers/passwordHelper");

const SENHA = "Rafael@1234";
const HASH = "$2b$04$3z3LiO5dY.JEsJotJRUGTOwAv5FIARwSy6mHjuJAUoaep57PgV.2m";
describe("UserHelper test Suite", function () {
	it("Deve gerar um hash a partir de uma senha", async () => {
		const result = await PasswordHelper.hashPassword(SENHA);

		assert.ok(result.length > 10);
	});
	it("Deve comparar um senha e seu hash", async () => {
		const result = await PasswordHelper.comparePassword(SENHA, HASH);
		assert.ok(result);
	});
});
