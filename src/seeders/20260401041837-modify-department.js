"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("departments", [
      {
        id: "a96814c7-61e6-4870-8e01-f8bd6255bdfa",
        name: "Finance Department",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "1cda2f3d-c8e0-4a3f-9c36-d3a6dbcee2d1",
        name: "Payroll Department",
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