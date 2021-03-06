const mysql = require('mysql2/promise');


exports.handler = async (event, context) => {
    console.log("logging added");
    console.log(event);
    console.log(context);

    var connection = await mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    });

    connection.connect();


    if (event.queryStringParameters && event.queryStringParameters["id"]) {
        let id = connection.escape(event.queryStringParameters.id)
        console.log(id)
        let [results, buffer] = await connection.query(`CALL get_station_by_station_id(`+id+`)`);
        console.log(JSON.stringify(results));
        let response = createResponse(results, true);
        return response;
    } else if (event.queryStringParameters && event.queryStringParameters["market"]) {
        let market = connection.escape(event.queryStringParameters["market"])
        console.log(market)
        let [results, buffer] = await connection.query(`CALL get_stations_by_market(`+market+`)`);
        console.log(JSON.stringify(results));
        let response = createResponse(results);
        return response;
    }
    else {
        let [results, buffer] = await connection.query('CALL get_all_stations()');
        console.log(JSON.stringify(results));
        let response = createResponse(results);
        return response;
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
