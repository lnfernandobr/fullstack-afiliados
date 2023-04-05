export default (sequelize, DataTypes) => {
  return sequelize.define('Affiliate', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
