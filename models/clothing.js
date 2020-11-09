'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clothing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  clothing.init({
    userId: DataTypes.INTEGER,
    shelterID: DataTypes.INTEGER,
    status: DataTypes.STRING,
    category: DataTypes.STRING,
    brand: DataTypes.STRING,
    style: DataTypes.STRING,
    material: DataTypes.STRING,
    color: DataTypes.STRING,
    condition: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'clothing',
  });
  return clothing;
};