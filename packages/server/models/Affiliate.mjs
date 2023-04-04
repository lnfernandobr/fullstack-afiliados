export default (sequelize, DataTypes) => {
  return sequelize.define("affiliate", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
