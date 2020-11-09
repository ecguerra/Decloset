'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserShelter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserShelter.init({
    userId: DataTypes.INTEGER,
    shelterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserShelter',
  });
  return UserShelter;
};