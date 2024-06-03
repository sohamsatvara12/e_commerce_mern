const { DataTypes } = require('sequelize');
const sequelize = require('./conn'); 

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
         notNull: {
        msg: 'Name is required'
      }
    }
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Category is required'
      },
      isInt: {
        msg: 'Category must be an integer'
      },
      min: {
        args: [1], // Adjust as needed based on your specific category values
        msg: 'Category must be a positive integer'
      }
    }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Price is required'
      },
      isInt: {
        msg: 'Price must be an integer'
      },
      min: {
        args: [0],
        msg: 'Price must be a positive value'
      }
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true // Assuming image is optional
  }
});

module.exports = Product;
