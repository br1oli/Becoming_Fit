const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'brand',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
