import express from "express";
import db from "../config/db.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find().limit(10).sort({ gamesplayed: -1 }).toArray();
  //let results = await collection.find().toArray();
  res.send(results).status(200);
});

// This section will get an individual record
router.get("/:username", async (req, res) => {
  let collection = await db.collection("records");
  let user = await collection.findOne({ name: req.params.username });

  if (!user) res.send("Not found").status(404);
  else res.send(user).status(200);
});

// This section will help you update a record.
router.put("/", async (req, res) => {
  let { isWinner, userName } = req.body;
  
  let collection = await db.collection("records");
  if (userName) {
    let user = await collection.findOne({ name: userName });
    let gamesplayed = user.gamesplayed;
    let gameswon = user.gameswon;
    let highscore = 0;
    if (isWinner) {
      gameswon += 1;
    }
    gamesplayed += 1;
    if (gamesplayed === 0 && gameswon === 0){
      highscore = 0;
    }
    else {
      highscore = Number(((gameswon/gamesplayed) * 100).toFixed(2));
    }
    const result = await collection.updateOne(
      { _id: new ObjectId(user._id) },
      { $set: { gamesplayed, gameswon, highscore } }
    );
    res.send(result).status(204);
  }
});

export default router;
