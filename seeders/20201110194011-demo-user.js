'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      { name:'cape',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name:'shirt',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name:'pants',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name:'shoes',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name:'sweater',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      { name:'helmet',
      createdAt: new Date(),
      updatedAt: new Date()
      }
  ], { returning: true }).then(function(categories) {
    return queryInterface.bulkInsert('clothings', [
      { style: 'long-sleeve striped T-shirt',
        status: 'KEEP',
        material: 'cotton',
        color: 'red,blue,yellow,white',
        condition: 'okay',
        brand: 'Sesame',
        userId: 1,
        categoryId: categories[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'jeans',
        status: 'KEEP',
        material: 'denim',
        color: 'light blue',
        condition: 'okay',
        brand: 'Sesame',
        userId: 1,
        categoryId: categories[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'sneakers',
        status: 'KEEP',
        material: 'canvas',
        color: 'red',
        condition: 'okay',
        brand: 'Sesame',
        userId: 1,
        categoryId: categories[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'v-neck striped sweater',
        status: 'KEEP',
        material: 'wool',
        color: 'orange, green, navy, white',
        condition: 'like new',
        brand: 'Sesame',
        userId: 1,
        categoryId: categories[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'slacks',
        status: 'KEEP',
        material: 'cotton',
        color: 'green',
        condition: 'like new',
        brand: 'Sesame',
        userId: 1,
        categoryId: categories[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'saddle shoes',
        status: 'KEEP',
        material: 'leather',
        color: 'blue',
        condition: 'like new',
        brand: 'Sesame',
        userId: 1,
        categoryId: categories[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'helmet',
        status: 'KEEP',
        material: 'iron',
        color: 'silver',
        condition: 'damaged',
        brand: 'Sesame',
        userId: 1,
        categoryId: categories[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { style: 'cape',
        status: 'KEEP',
        material: 'polyester',
        color: 'pink',
        condition: 'poor',
        brand: 'Sesame',
        userId: 1,
        categoryId: categories[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {})
  }
};
