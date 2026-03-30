// 
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   

    await queryInterface.createTable("leaves", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      employeeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "employees", key: "id" },
        onDelete: "CASCADE",
      },

      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      reason: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM("pending", "approved", "rejected", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },

      approvedBy: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("leaves");
  },
};
