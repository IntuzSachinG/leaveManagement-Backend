"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("leaves", [
      {
        id: "0d2de37e-1e93-40d2-bab6-7b837a0a81dc",
        employeeId: "ff92c498-a81c-45c1-a1af-b2520ecf1547",
        startDate: new Date("2026-04-01"),
        endDate: new Date("2026-04-03"),
        reason: "Personal work",
        status: "pending",
        approvedBy: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "d3d0bd2b-d805-4f36-a265-29117ec12f44",
        employeeId: "ff92c498-a81c-45c1-a1af-b2520ecf1547",
        startDate: new Date("2026-04-10"),
        endDate: new Date("2026-04-12"),
        reason: "Medical leave",
        status: "approved",
        approvedBy: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "64778ff8-6c20-48f8-8f1b-c5198775e392",
        employeeId: "5cc2b1cc-3f5f-4f52-bc31-c31f2ccdbb6a",
        startDate: new Date("2026-04-05"),
        endDate: new Date("2026-04-07"),
        reason: "Family event",
        status: "rejected",
        approvedBy: 2,
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
    await queryInterface.bulkDelete("leaves", null, {});
  },
};

