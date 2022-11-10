const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define(
        "paymentDetail",
        {
            amount: {
                type: DataTypes.INTEGER,
                allownull: false,
            },
            provider: {
                type: DataTypes.STRING,
                allownull: false,
            },
            state: {
                type: DataTypes.ENUM("success", "failure", "pending"),
                allownull: false,
            },
            mercadoPagoPaymentId: {
                type: DataTypes.STRING,
                allownull: false,
                unique: true
            }
        },
        {
            timestamps: true,
        }
    );
};