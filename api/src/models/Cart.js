const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('cart', {
        total: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
    },
        {
            timestamps: false
        }

    )
}
