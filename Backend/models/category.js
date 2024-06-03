
const { DataTypes } = require('sequelize');

const sequelize = require('./conn');

 const Category = sequelize.define('Category',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
             notNull: {
            msg: 'Category Name is required'
          }
        }
      },

})

module.exports = Category;