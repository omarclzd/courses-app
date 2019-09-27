("use strict");
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define("Test", {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    // course_id: {
    //   type: DataTypes.INTEGER(10),
    //   allowNull: false
    // },

    num_of_questions: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },

    duration: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  });

  Test.associate = models => {
    models.Test.belongsTo(models.Course, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Test;
};
