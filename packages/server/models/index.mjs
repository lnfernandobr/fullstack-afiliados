import Sequelize from 'sequelize';
import UserModel from './User.mjs';
import TokenModel from './Token.mjs';
import TransactionModel from './Transaction.mjs';
import CreatorModel from './Creator.mjs';
import ProductModel from './Product.mjs';
import AffiliateModel from './Affiliate.mjs';

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
);

const User = UserModel(sequelize, Sequelize);
const Token = TokenModel(sequelize, Sequelize);

const Product = ProductModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);
const Creator = CreatorModel(sequelize, Sequelize);
const Affiliate = AffiliateModel(sequelize, Sequelize);

sequelize
  .sync({ force: false })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('All tables have been synchronized with the database');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Unable to synchronize tables with database', err);
  });

export { User, Token, Transaction, Affiliate, Product, Creator, sequelize };
