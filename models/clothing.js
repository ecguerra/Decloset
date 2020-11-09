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
      models.clothing.belongsTo(models.user)
      models.clothing.belongsTo(models.shelter)
      models.clothing.belongsTo(models.category)
    }
  };
  clothing.init({
    userId: DataTypes.INTEGER,
    shelterId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
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