'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      { name:'Ernie',
        email:'ernie@sesame.org',
        password:'RubberDucky123',
        city:'Boston',
        state:'MA',
        zip:'02131',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name:'Bert',
        email:'bert@sesame.org',
        password:'PaperClips456',
        city:'Boston',
        state:'MA',
        zip:'02131',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name:'Grover',
        email:'grover@sesame.org',
        password:'OverUnderThrough789',
        city:'Boston',
        state:'MA',
        zip:'02131',
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], { returning: true }).then(function(users) {
    return queryInterface.bulkInsert('clothings', [
      { style: 'long-sleeve striped T-shirt',
        status: 'KEEP',
        material: 'cotton',
        color: 'red,blue,yellow,white',
        condition: 'okay',
        brand: 'Sesame',
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'jeans',
        status: 'KEEP',
        material: 'denim',
        color: 'light blue',
        condition: 'okay',
        brand: 'Sesame',
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'sneakers',
        status: 'KEEP',
        material: 'canvas',
        color: 'red',
        condition: 'okay',
        brand: 'Sesame',
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'v-neck striped sweater',
        status: 'KEEP',
        material: 'wool',
        color: 'orange, green, navy, white',
        condition: 'like new',
        brand: 'Sesame',
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'slacks',
        status: 'KEEP',
        material: 'cotton',
        color: 'green',
        condition: 'like new',
        brand: 'Sesame',
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'saddle shoes',
        status: 'KEEP',
        material: 'leather',
        color: 'blue',
        condition: 'like new',
        brand: 'Sesame',
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'helmet',
        status: 'KEEP',
        material: 'iron',
        color: 'silver',
        condition: 'damaged',
        brand: 'Sesame',
        userId: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'cape',
        status: 'KEEP',
        material: 'polyester',
        color: 'pink',
        condition: 'poor',
        brand: 'Sesame',
        userId: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ])
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
};
