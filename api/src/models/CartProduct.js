const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "cartProduct",
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
