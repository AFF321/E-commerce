const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    category_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    category_name:{
      type: DataTypes.STRING,
      defaultValue:'default category',
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
