const mysql = require('mysql2/promise');


exports.handler = async (event, context, callback) => {

    var connection = await mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    });

    connection.connect();

    if (event.queryStringParameters && event.queryStringParameters["committee-id"]) {
        let committeeID = event.queryStringParameters["committee-id"]
        console.log(committeeID)
        let [results, buffer] = await connection.query(`CALL get_committee_by_committee_id("${committeeID}")`);
        console.log(JSON.stringify(results));
        let response = createResponse(results[0]);
        return response;
    } else {
        let [results, buffer] = await connection.query('CALL get_all_committees()');
        console.log(JSON.stringify(results));
        return createResponse(results);
    }
};

function createResponse(results) {
    return {
        "statusCode": 200,
        "body": JSON.stringify(results[0])
    }
}