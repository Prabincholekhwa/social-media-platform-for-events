'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Sports',
          id: '6c9904794f56e51e',
          inserted: new Date(),
          updated: new Date(),
        },
        {
          name: 'Music',
          id: '0d3172b9ca46ae32',
          inserted: new Date(),
          updated: new Date(),
        },
        {
          name: 'Tech',
          id: 'a57ed7e029bb8225',
          inserted: new Date(),
          updated: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
