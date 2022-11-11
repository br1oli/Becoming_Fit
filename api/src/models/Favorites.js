const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define(
        "favorites",
        {
            amount: {
                type: DataTypes.INTEGER,
                allownull: false,
            },
        },
        {
            timestamps: false,
        }
    );
};