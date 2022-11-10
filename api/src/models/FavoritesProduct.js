const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define(
        "favoritesProduct",
        {
            type: {
                type: DataTypes.STRING,
                allownull: true,
            },
            model: {
                type: DataTypes.STRING,
                allownull: false,
                unique: true,
            },
        },
        {
            timestamps: false,
        }
    );
};