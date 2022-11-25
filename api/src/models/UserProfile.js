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
      userName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
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
        type: DataTypes.ARRAY(DataTypes.STRING),
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
