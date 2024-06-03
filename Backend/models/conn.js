const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'postgresqlashish.postgres.database.azure.com',
  port: 5432,
  username: 'sa@postgresqlashish',
  password: 'Hypeteq@2023',
  database: 'soham-db'
});

module.exports = sequelize;
