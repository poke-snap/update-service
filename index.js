const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-west-2",
    endpoint: "https://dynamodb.us-west-2.amazonaws.com"
});

async function updateDatabase(params) {
    const docClient = new AWS.DynamoDB.DocumentClient();

    await docClient.put(params).promise()
    .then((data) => {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    })
    .catch((err) => {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    })

    console.log('Updated DynamoDB');
}


exports.handler = async (event, context) => {

    console.log(event);
    console.log(event.body);
    const obj = JSON.parse(event.body);
    console.log(obj)

    const queryParams = {
        TableName: 'poke-snap',
        Item: obj,
        // Key: obj['key'],
        // UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
        // ExpressionAttributeValues: obj['value']
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            //   username: event.body['username'], 
            body: event.body,
            params: obj
        }),
    };

    await updateDatabase(queryParams)

    return response;
};
