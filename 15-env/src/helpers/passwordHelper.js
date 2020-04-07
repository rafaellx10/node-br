const bCrypt = require("bcrypt");
const { promisify } = require("util");

const hashAsync = promisify(bCrypt.hash);
const compareAsync = promisify(bCrypt.compare);
const SALT = parseInt(process.env.SALT_PWD);

class PasswordHelper {
	static hashPassword(pass) {
		return hashAsync(pass, SALT);
	}

	static comparePassword(pass, hash) {
		return compareAsync(pass, hash);
	}
}

module.exports = PasswordHelper;
