const User = require("./User");
const Token = require("./Token");

// Define associations
Token.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Token, { foreignKey: "userId" });

module.exports = {
  User,
  Token,
};
