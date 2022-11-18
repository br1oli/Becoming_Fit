const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('purchasedProduct', {

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