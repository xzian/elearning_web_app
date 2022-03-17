const bcrypt = require("bcrypt");

async function genPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports.validatePassword = validatePassword;
module.exports.genPassword = genPassword;
