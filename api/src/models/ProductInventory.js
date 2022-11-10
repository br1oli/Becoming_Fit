const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('productInventory', {

        amount: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
    },
        {
            timestamps: false
        }

    )
}