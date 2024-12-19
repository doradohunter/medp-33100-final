const { MongoClient } = require('mongodb');
require('dotenv').config()
const uri = process.env.DB_URI;

const client = new MongoClient(uri, {
    autoSelectFamily: false 
});

async function connectToDatabase() {
    console.log('Connecting to MongoDB...');
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        return client.db('blog');
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}

module.exports = connectToDatabase;

