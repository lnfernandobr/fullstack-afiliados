import bcrypt from "bcrypt";

export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  User.beforeSave(async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.prototype.comparePassword = function comparePassword(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
