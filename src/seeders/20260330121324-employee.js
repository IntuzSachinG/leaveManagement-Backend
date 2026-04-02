"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash("123456", 10);
    const password1 = await bcrypt.hash("pass1234", 10);
    const password2 = await bcrypt.hash("pass1235", 10);
    const password3 = await bcrypt.hash("pass1236", 10);
  

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("employees", [
      {
        id: "53057917-dfbf-46fb-87af-9eb38f59b178",
        name: "Admin User",
        email: "admin@test.com",
        departmentId: "5d071de6-69ab-4f79-ba72-46a5e7e84afd",
        mobile:"2319467981",
        password:password,
          gender: "male",
         status: "active",
        role: "admin",

        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "1ceeba01-caa1-4367-b7e2-5dfe23f6713f",
        name: "Manager User",
        email: "manager@test.com",
        departmentId: "dc20ea88-06cf-44e0-8960-f5a4adfe1266",
        mobile:"7773332367",
        password:password1,
         gender: "male",
         status: "active",
        role: "manager",

     created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "ff92c498-a81c-45c1-a1af-b2520ecf1547",
        name: "Employee User",
        email: "employee@test.com",
        departmentId: "dc20ea88-06cf-44e0-8960-f5a4adfe1266",
        mobile:"6009294531",
        password:password2,
          gender: "male",
            status: "active",
        role: "employee",

        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "5cc2b1cc-3f5f-4f52-bc31-c31f2ccdbb6a",
        name: "Employee Two",
        email: "employee2@test.com",
        departmentId: "dc20ea88-06cf-44e0-8960-f5a4adfe1266",
        mobile:"5678342567",
        password:password3,
         gender: "male",
            status: "active",
        role: "employee",

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
    await queryInterface.bulkDelete("employees", null, {});
  },
};



