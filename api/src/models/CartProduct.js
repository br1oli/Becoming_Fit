const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('cartProduct', {
        amount: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
    }, {
        timestamps: false
    }
    )
}