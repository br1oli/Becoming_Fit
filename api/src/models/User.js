const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allownull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allownull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allownull: false,
      },
      email: {
        type: DataTypes.STRING,
        allownull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.INTERGER,
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allownull: false,
      },
      adminPermissions: {
        type: DataTypes.BOOLEAN,
        allownull: false,
        defaultValue: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          'https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg',
      },
    },
    {
      timestamps: false,
    }
  );
};
