import Sequelize from "sequelize";
import UserModel from "./User.mjs";
import TokenModel from "./Token.mjs";
import CreatorModel from "./Creator.mjs";
import ProductModel from "./Product.mjs";
import AffiliateModel from "./Affiliate.mjs";
import TransactionModel from "./Transaction.mjs";

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const User = UserModel(sequelize, Sequelize);
const Token = TokenModel(sequelize, Sequelize);
const Creator = CreatorModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Affiliate = AffiliateModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);

Creator.hasMany(Product);
Product.belongsTo(Creator);

Affiliate.hasMany(Transaction);
Transaction.belongsTo(Affiliate);

Product.hasMany(Transaction);
Transaction.belongsTo(Product);

sequelize
  .sync({ force: false })
  .then(() =>
    console.log("All tables have been synchronized with the database")
  )
  .catch((err) =>
    console.error("Unable to synchronize tables with database", err)
  );

export { Product, Creator, Affiliate, Transaction, User, Token, sequelize };
