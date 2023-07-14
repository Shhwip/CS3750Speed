import express from 'express';
import cors from "cors";
import "./config/loadEnvironment.mjs";
import db from "./config/db.mjs"
import api from "./routes/api.mjs"
import deck from "./routes/deck.mjs"

const app = express();

//please keep the port consistence
const port = 5050;

//const router = express.Router();


app.use(cors());
app.use("/", deck);
app.use(express.json());


app.use('/api', api);

//app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
