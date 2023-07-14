import express from 'express';
import cors from "cors";
import "./config/loadEnvironment.mjs";
import db from "./config/db.mjs"
import api from "./routes/api.mjs"
const app = express();

const port = 5050;

const router = express.Router();


app.use(cors());
app.use(express.json());


app.use('/api', api);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
