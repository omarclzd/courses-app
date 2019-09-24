const Sequelize = require("sequelize");

module.exports = sequelize.define("Course", {
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
  }
});
