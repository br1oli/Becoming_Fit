const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('productCategory', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
          },
    },
        {
            timestamps: false
        }
    )
}