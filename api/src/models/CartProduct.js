const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "cartProduct",
    {
      amount: {
        type: DataTypes.INTEGER,
      },
      color: {
        type: DataTypes.STRING,
      },
      size: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
