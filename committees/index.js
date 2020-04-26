const mysql = require('mysql2/promise');


exports.handler = async (event, context, callback) => {

    var connection = await mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    });

    connection.connect();

    if (event.queryStringParameters && event.queryStringParameters["id"]) {
        let id = connection.escape(event.queryStringParameters["id"])
        console.log(id)
        let [results, buffer] = await connection.query(`CALL get_committee_by_committee_id(`+id+`)`);
        console.log(JSON.stringify(results));
        let response = createResponse(results, true);
        return response;
    } else {
        let [results, buffer] = await connection.query('CALL get_all_committees()');
        console.log(JSON.stringify(results));
        return createResponse(results);
    }
};

function createResponse(results, isSingle) {
    if (results[0].length === 0) {
        return {
            "statusCode": 404,
            "body": "No object found"
        }
    }

    if (isSingle) {
        return {
            "statusCode": 200,
            "body": JSON.stringify(results[0][0])
        }
    }

    
    return {
        "statusCode": 200,
        "body": JSON.stringify(results[0])
    }
}