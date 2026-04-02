"use strict";

const bcrypt = require("bcryptjs");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  

    const password4 = await bcrypt.hash("test1", 10);
    const password5 = await bcrypt.hash("test2", 10);
    const password6 = await bcrypt.hash("test3", 10);
    const password7 = await bcrypt.hash("test4", 10);

    await queryInterface.bulkInsert("employees", [
      {
        id: "0b212bfe-6146-4728-a931-71a919d9ef95",
        name: "Admin",
        email: "admin@gmail.com",
        departmentId:"a96814c7-61e6-4870-8e01-f8bd6255bdfa",
        mobile: "9999999991",
        password:password4,
        gender: "male",
        status: "active",
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: "f6572a0b-fc4d-4873-b5e4-83b4f695b339",
        name: "Manager",
        email: "manager@gmail.com",
        departmentId:"a96814c7-61e6-4870-8e01-f8bd6255bdfa",
        mobile: "9999999992",
        password:password5,
        gender: "male",
        status: "active",
        role: "manager",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: "ef1435ad-febb-476c-88cf-31402f17f199",
        name: "Employee Three",
        email: "employeethree@gmail.com",
        departmentId:"1cda2f3d-c8e0-4a3f-9c36-d3a6dbcee2d1",
        mobile: "9999999993",
        password:password6,
        gender: "male",
        status: "active",
        role: "employee",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: "ce6c18d8-f5cb-4379-9153-6f08125eafa3",
        name: "Employee Four",
        email: "employeefour@gmail.com",
        departmentId:"1cda2f3d-c8e0-4a3f-9c36-d3a6dbcee2d1",
        mobile: "9999999912",
        password:password7,
        gender: "male",
        status: "active",
        role: "employee",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("employees", null, {});
  },
};
