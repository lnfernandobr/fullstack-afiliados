export default (sequelize, DataTypes) => {
  return sequelize.define("Token", {
    token: DataTypes.STRING,
  });
};
