const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
app.use(bodyParser.json());

// MongoDB connection details from environment variables
const mongoUsername = process.env.MONGO_USERNAME || 'username';
const mongoPassword = process.env.MONGO_PASSWORD || 'password';
const mongoHost = process.env.MONGO_HOST || 'mongo';
const mongoPort = process.env.MONGO_PORT || '27017';
const dbName = 'userDB';
const collectionName = 'users';

let db;

// Connect to MongoDB
async function connectToMongo() {
    const uri = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}/${dbName}?authSource=admin`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB');
        
        // Create index on id field for better performance
        await db.collection(collectionName).createIndex({ id: 1 }, { unique: true });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await db.collection(collectionName).find().toArray();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error fetching users');
    }
});

// Get a single user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await db.collection(collectionName).findOne({ id: parseInt(req.params.id) });
        if (!user) return res.status(404).send('User not found');
        res.json(user);
    } catch (err) {
        res.status(500).send('Error fetching user');
    }
});

// Create a new user
app.post('/users', async (req, res) => {
    try {
        // Get current max id to auto-increment
        const maxIdUser = await db.collection(collectionName)
            .find()
            .sort({ id: -1 })
            .limit(1)
            .next();
        
        const newId = maxIdUser ? maxIdUser.id + 1 : 1;
        
        const user = {
            id: newId,
            name: req.body.name,
            email: req.body.email
        };
        
        const result = await db.collection(collectionName).insertOne(user);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).send('Error creating user');
    }
});

// Update a user
app.put('/users/:id', async (req, res) => {
    try {
        const result = await db.collection(collectionName).updateOne(
            { id: parseInt(req.params.id) },
            { $set: { name: req.body.name, email: req.body.email } }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).send('User not found');
        }
        
        const updatedUser = await db.collection(collectionName).findOne({ id: parseInt(req.params.id) });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).send('Error updating user');
    }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const result = await db.collection(collectionName).deleteOne({ id: parseInt(req.params.id) });
        
        if (result.deletedCount === 0) {
            return res.status(404).send('User not found');
        }
        
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).send('Error deleting user');
    }
});

// Start the server after connecting to MongoDB
const PORT = process.env.PORT || 3000;
connectToMongo().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});