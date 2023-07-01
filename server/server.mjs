import express from 'express';
const app = express();
const port = 5050;

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
