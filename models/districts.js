'use strict';
module.exports = (sequelize, DataTypes) => {
  var Districts = sequelize.define('Districts', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Districts.associate = function(models) {
    // associations can be defined here
  };
  return Districts;
};