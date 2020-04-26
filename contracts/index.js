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
        let id = event.queryStringParameters["id"]
        console.log(id)
        let [results, buffer] = await connection.query(`CALL get_contract_by_contract_id("${id}")`);
        console.log(JSON.stringify(results));
        
        let response = createResponse(results, true);
        return response;
    } else if (event.queryStringParameters && event.queryStringParameters["committee-id"] && event.queryStringParameters["buyer-id"]) {
        let committeeID = event.queryStringParameters["committee-id"]
        let buyerID = event.queryStringParameters["buyer-id"]
        console.log(committeeID)
        let [results, buffer] = await connection.query(`CALL get_contracts_by_committee_and_buyer_id("${committeeID}","${buyerID}")`);
        console.log(JSON.stringify(results));
        let response = createResponse(results);
        return response;
    } else if (event.queryStringParameters && event.queryStringParameters["market"]) {
        let market = event.queryStringParameters["market"]
        console.log(market)
        let [results, buffer] = await connection.query(`CALL get_contracts_by_market("${market}")`);
        console.log(JSON.stringify(results));
        let response = createResponse(results);
        return response;
    } else if (event.queryStringParameters && event.queryStringParameters["range"]) {
        let range = event.queryStringParameters["range"]
        console.log(range)
        let [results, buffer] = await connection.query(`CALL get_contracts_within_range("${range}")`);
        console.log(JSON.stringify(results));
        let response = createResponse(results);
        return response;
    } else {
        let [results, buffer] = await connection.query('CALL get_all_contracts()');
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
