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
    return createResponse(results);
};

function createResponse(results) {
    return {
        "isBase64Encoded": true,
        "statusCode": 200,
        "headers": { "Content-Type": "application/json" },
        "body": {
            "results": results
        }
    }
}