const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('purchaseDetail', {
        total: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        purchaseDate: {
            type: DataTypes.DATEONLY,
            allownull: false,
        },
        idCompraMP: {
            type: DataTypes.INTEGER,
            allownull: false
        }
    },
        {
            timestamps: false
        }

    )
}