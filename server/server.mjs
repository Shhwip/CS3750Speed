import express from 'express';
import cors from "cors";
import db from "./config/db.mjs"

const app = express();

const port = 5050;

const router = express.Router();


app.use(cors());
app.use(express.json());

// Test the first collection
async function testCollection() {
  try {
    const myFirstCollection = db.collection('MyfirstCollection');
    await myFirstCollection.insertOne({ groupName: 'Outoftown' });
    console.log('Inserted document into MyfirstCollection');
  } catch (error) {
    console.error('Error inserting document:', error);
  }
}

testCollection();

// Handle GET requests
router.get('/', async (req, res) => {
  try {
    const collection = db.collection('MyfirstCollection');
    const results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Assign the router to the root URL
app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
