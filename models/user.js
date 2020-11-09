'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.clothing)
      models.user.belongsToMany(models.shelter, {through: 'UserShelter'})
    }
  };
  // updating attributes with sequelize validation
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2,25],
          msg: 'Name must be between 2 and 25 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // isEmail: true, // can just use this without msg if desired
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        // IRL would need to add additional validators, per THE DOCS
        len: {
          args: [8,99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    },
    city: DataTypes.STRING,
    state: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2,2],
          msg: 'Please use a valid state abbreviation'
        }
      }
    },
    zip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });

  // add sequelize hook to hash and salt passwords // async way
  user.addHook('beforeCreate',async (pendingUser,options)=>{
    await bcrypt.hash(pendingUser.password, 10)
    .then(hashedPassword => {
      console.log(`${pendingUser.password} became ====> ${hashedPassword}`)
      // replace original password with the hash
      pendingUser.password = hashedPassword
    })
  })

  // sync way 
  // user.addHook('beforeCreate', (pendingUser, options) =>{
  //   let hashedPassword = bcrypt.hashSync(pendingUser.password, 10)
  //   console.log(`${pendingUser.password} became ====> ${hashedPassword}`)
  //   pendingUser.password = hashedPassword
  // })

  user.prototype.validPassword = async function(passwordInput) {
    let match = await bcrypt.compare(passwordInput, this.password)
    return match
  }

  return user;
};