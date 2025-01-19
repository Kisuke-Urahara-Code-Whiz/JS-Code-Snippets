const pg = require('pg');


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "IGGalaxy",
    port: 5432,
});

module.exports = db;