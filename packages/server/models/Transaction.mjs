export default (sequelize, DataTypes) => {
  return sequelize.define('Transaction', {
    date: DataTypes.DATE,
    value: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    type: DataTypes.INTEGER,
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    affiliateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    saleMadeBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
