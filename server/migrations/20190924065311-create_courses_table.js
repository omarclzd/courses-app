"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Return promise
    return queryInterface.createTable("courses", {
      id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      domain: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    //Return a promise that drops a table in case of (migration:undo)
    return queryInterface.dropTable("courses");
  }
};
