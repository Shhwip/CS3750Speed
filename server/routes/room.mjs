import express from "express";
import db from "../config/db.mjs";

const router = express.Router();

router.post("/createRoom", async(req, res) => {
    const {gameType, userName} = req.body;
    console.log("game type: " +gameType);
    console.log("user name: " + userName);
    let collection = db.collection("Game-Room");
    let result = await collection.insertOne({gameType, userName});
    res.status(200).send(result);
})

router.get("/getRooms", async (req, res) => {
    try {
        let collection = db.collection("Game-Room");
        
        // Use 'find' and 'toArray' to get all the documents
        let result = await collection.find().toArray();

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching rooms");
    }
});

export default router;