"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    

    await queryInterface.bulkInsert("leaves", [
      {
        id: "690f8312-2e45-4a7b-88fb-e120eaacb3a0",
        employeeId: "ef1435ad-febb-476c-88cf-31402f17f199",
        startDate: new Date("2026-04-10"),
        endDate: new Date("2026-04-12"),
        reason: "Vacation",
        status: "pending",
        approvedBy: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "0cd6992c-f499-498d-bcd7-c3aa6d6bd462",
        employeeId: "ef1435ad-febb-476c-88cf-31402f17f199",
        startDate: new Date("2026-04-15"),
        endDate: new Date("2026-04-16"),
        reason: "Family Event",
        status: "approved",
        approvedBy: "f6572a0b-fc4d-4873-b5e4-83b4f695b339",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "e0c92dd1-d872-4f8e-a0f1-340f2e72dffd",
        employeeId: "ce6c18d8-f5cb-4379-9153-6f08125eafa3",
        startDate: new Date("2026-04-18"),
        endDate: new Date("2026-04-19"),
        reason: "Personal",
        status: "rejected",
        approvedBy: "0b212bfe-6146-4728-a931-71a919d9ef95",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("leaves", null, {});
  },
};
