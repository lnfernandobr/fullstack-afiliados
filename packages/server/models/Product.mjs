export default (sequelize, DataTypes) => {
  return sequelize.define("product", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
