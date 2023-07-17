import express from 'express';
import cors from "cors";
import "./config/loadEnvironment.mjs";
import db from "./config/db.mjs"
import californiaSpeed from "./routes/games/californiaSpeed.mjs"
import api from "./routes/api.mjs"
import deck from "./routes/deck.mjs"
import bodyParser from "body-parser";

const app = express();

//please keep the port consistence
const port = 5050;

//const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/", deck);
app.use("/game", californiaSpeed);
app.use(express.json());


app.use('/api', api);

//app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
