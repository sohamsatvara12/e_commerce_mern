const Pool = require('pg').Pool;

const pool = new Pool({
    
    user: "sa@postgresqlashish",
    password: "Hypeteq@2023",
    host : "postgresqlashish.postgres.database.azure.com",
    port: 5432,
    database: "soham-db"
   
});

module.exports = pool;