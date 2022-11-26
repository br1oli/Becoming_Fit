const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "userProfile",
    {
      // id: {
      //   type: DataTypes.UUID,
      //   primaryKey: true,
      //   defaultValue: DataTypes.UUIDV4,
      //   unique: true,
      //   allowNull: true,
      // },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      phone: {
        type: DataTypes.STRING,
      },
      adress: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      zipCode: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
