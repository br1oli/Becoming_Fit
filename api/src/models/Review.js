const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('review', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    comment: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    recommend: {
      type: DataTypes.STRING,
    },
    quality: {
      type: DataTypes.FLOAT,
    },
  },
  {
      timestamps: false,
  });
};
