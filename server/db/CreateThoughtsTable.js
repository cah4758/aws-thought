const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});

const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const params = {
  TableName: "Thoughts",
  KeySchema: [
    { AttributeName: "username", KeyType: "HASH" }, // Partition(primary) key
    { AttributeName: "createdAt", KeyType: "RANGE" }, // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "username", AttributeType: "S" }, //string
    { AttributeName: "createdAt", AttributeType: "N" }, //number
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10, //max write and read capacity
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
