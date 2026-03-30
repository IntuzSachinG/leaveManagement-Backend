"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("departments", [
      {
        id: "5d071de6-69ab-4f79-ba72-46a5e7e84afd",
        name: "Human Resource",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "dc20ea88-06cf-44e0-8960-f5a4adfe1266",
        name: "Sales",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("departments", null, {});
  },
};
