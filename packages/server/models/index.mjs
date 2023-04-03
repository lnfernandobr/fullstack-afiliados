import Sequelize from "sequelize";
import UserModel from "./User.mjs";
import TokenModel from "./Token.mjs";

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

sequelize
  .sync({ force: false })
  .then(() =>
    console.log("All tables have been synchronized with the database")
  )
  .catch((err) =>
    console.error("Unable to synchronize tables with database", err)
  );

export { User, Token, sequelize };
