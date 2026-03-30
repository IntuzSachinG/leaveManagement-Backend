'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   


    await queryInterface.createTable("employees", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
  departmentId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: "departments", key: "id" },
       onDelete: "CASCADE",
    },
   

       mobile: {
           type: Sequelize.STRING,
           allowNull: true,
           unique: true,
           
         },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
        allowNull: false,
        
      },
      

      status: {
        type: Sequelize.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },

      role: {
        type: Sequelize.ENUM("manager", "admin" ,"employee"),
        allowNull: false,
        defaultValue: "employee",
      },

      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

      await queryInterface.dropTable("employees");
  }
};