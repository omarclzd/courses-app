"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tests", {
      id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      course_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      },
      num_of_questions: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true
      },

      duration: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tests");
  }
};
