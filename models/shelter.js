'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shelter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.shelter.belongsToMany(models.user, {through: 'UserShelter'})
      models.shelter.hasMany(models.clothing)
    }
  };
  shelter.init({
    name: DataTypes.STRING,
    detail: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    address: DataTypes.STRING,
    address_city: DataTypes.STRING,
    address_state: DataTypes.STRING,
    address_zip: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'shelter',
  });
  return shelter;
};