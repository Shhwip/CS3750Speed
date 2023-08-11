import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find().sort({gamesplayed: 1}).toArray();
    res.send(results).status(200);
  });

  // This section will help you update a record.
router.put("/", async (req, res) => {
    let {isWinner, userName} = req.body
    let collection = await db.collection("records");
    let user = await collection.findOne(userName);
    let gamesplayed = user.gamesplayed;
    let gameswon = user.gameswon;
    if (isWinner){
        gameswon += 1;
    }
    gamesplayed += 1;
    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { gamesplayed, gameswon } }
      );
    res.send(result).status(204);
  });

  export default router;