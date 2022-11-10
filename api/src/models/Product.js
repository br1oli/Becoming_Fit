const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
      },
      /*  category: {
        type: DataTypes.STRING,
        allowNull: false,
      }, */
      color: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /*  brand: {
        type: DataTypes.STRING,
        allowNull: false,
      }, */
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /* agregue cantidad permitida de caracteres para que no se rompa la db con las descripciones largas, para no tener que tocar el json */
      description: {
        type: DataTypes.STRING(2000),
      },
      image: {
        type: DataTypes.STRING,
        allownull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};