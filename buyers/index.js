const mysql = require('mysql2/promise');


exports.handler = async (event, context, callback) => {

    var connection = await mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    });

    connection.connect();


    let [results, buffer] = await connection.query('show tables');
    console.log(JSON.stringify(results));
    return results;
};