const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lapislazu2343:ZDvjHzhtDAqivQWk@cluster0.fzwjh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    autoSelectFamily: false
});
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return client.db('gaming_journal');
    } catch {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
//run().catch(console.dir);
module.exports = connectToDatabase;