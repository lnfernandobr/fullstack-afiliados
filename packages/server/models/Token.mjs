export default (sequelize, DataTypes) => {
  const Token = sequelize.define("Token", {
    token: DataTypes.STRING,
  });
  return Token;
};
