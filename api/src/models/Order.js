const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'order',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addres: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
