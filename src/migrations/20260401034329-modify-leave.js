"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      UPDATE leaves SET approvedBy = NULL
    `);

    await queryInterface.changeColumn("leaves", "approvedBy", {
      type: Sequelize.UUID,
      allowNull: true,
    });

    await queryInterface.addConstraint("leaves", {
      fields: ["approvedBy"],
      type: "foreign key",
      name: "fk_leaves_approvedBy_employee",
      references: {
        table: "employees",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "leaves",
      "fk_leaves_approvedBy_employee",
    );

    await queryInterface.changeColumn("leaves", "approvedBy", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
