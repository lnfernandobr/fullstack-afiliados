export default (sequelize, DataTypes) => {
  return sequelize.define('Creator', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
