const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('productCategory', {
        name: {
            type: DataTypes.STRING,
            allownull: false,
        },
    },
        {
            timestamps: false
        }
    )
}