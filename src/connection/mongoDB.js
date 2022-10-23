const { MongoClient } = require("mongodb");
const username = encodeURIComponent("kozhenevskiyandrey");
const password = encodeURIComponent("geDgcAE3UVaPgzmz");
const cluster = "cluster0.2k3b21r.mongodb.net";

let uri =
    `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
async function testMongoConnection() {
    try {
        await client.connect();
        const database = client.db("LessonNodeDB");
        const ratings = database.collection("Collection0");
        const cursor = ratings.find();
        console.log(ratings)
        await cursor.forEach(doc => console.log(doc));

    } finally {
        await client.close();
    }
}
module.exports = testMongoConnection;