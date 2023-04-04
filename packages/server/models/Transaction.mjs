export default (sequelize, DataTypes) => {
  return sequelize.define("transaction", {
    date: DataTypes.DATE,
    product: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    seller: DataTypes.STRING,
    type: DataTypes.INTEGER,
  });
};
