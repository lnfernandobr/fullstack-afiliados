export default (sequelize, DataTypes) => {
  return sequelize.define("creator", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
