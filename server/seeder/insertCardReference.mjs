import db from "../config/db.mjs";

const insertCardReference = async () => {
  try {
    const cardCollection = db.collection("cardCollection");

    // Drop all documents in the collection
    await cardCollection.deleteMany({});
    //insert things
    await cardCollection.insertOne({ number: 1, reference: "2_of_clubs.png" });
    await cardCollection.insertOne({ number: 2, reference: "3_of_clubs.png" });
    await cardCollection.insertOne({ number: 3, reference: "4_of_clubs.png" });
    await cardCollection.insertOne({ number: 4, reference: "5_of_clubs.png" });
    await cardCollection.insertOne({ number: 5, reference: "6_of_clubs.png" });
    await cardCollection.insertOne({ number: 6, reference: "7_of_clubs.png" });
    await cardCollection.insertOne({ number: 7, reference: "8_of_clubs.png" });
    await cardCollection.insertOne({ number: 8, reference: "9_of_clubs.png" });
    await cardCollection.insertOne({ number: 9, reference: "10_of_clubs.png" });
    await cardCollection.insertOne({
      number: 10,
      reference: "jack_of_clubs.png",
    });
    await cardCollection.insertOne({
      number: 11,
      reference: "queen_of_clubs.png",
    });
    await cardCollection.insertOne({
      number: 12,
      reference: "king_of_clubs.png",
    });
    await cardCollection.insertOne({
      number: 13,
      reference: "ace_of_clubs.png",
    });

    await cardCollection.insertOne({
      number: 14,
      reference: "2_of_diamonds.png",
    });
    await cardCollection.insertOne({
      number: 15,
      reference: "3_of_diamonds.png",
    });
    await cardCollection.insertOne({
      number: 16,
      reference: "4_of_diamonds.png",
    });
    await cardCollection.insertOne({
      number: 17,
      reference: "5_of_diamonds.png",
    });
    await cardCollection.insertOne({
      number: 18,
      reference: "6_of_diamonds.png",
    });
    await cardCollection.insertOne({
      number: 19,
      reference: "7_of_diamonds.png",
    });
    await cardCollection.insertOne({
      number: 20,
      reference: "8_of_diamonds.png",
    });
    await cardCollection.insertOne({
      number: 21,
      reference: "9_of_diamonds.png",
    });
    await cardCollection.insertOne({
      number: 22,
      reference: "10_of_diamonds.png",
    });
    await cardCollection.insertOne({
      number: 23,
      reference: "jack_of_diamonds.png",
    });
    await cardCollection.insertOne({
      number: 24,
      reference: "queen_of_diamonds.png",
    });
    await cardCollection.insertOne({
      number: 25,
      reference: "king_of_diamonds.png",
    });
    await cardCollection.insertOne({
      number: 26,
      reference: "ace_of_diamonds.png",
    });

    await cardCollection.insertOne({
      number: 27,
      reference: "2_of_hearts.png",
    });
    await cardCollection.insertOne({
      number: 28,
      reference: "3_of_hearts.png",
    });
    await cardCollection.insertOne({
      number: 29,
      reference: "4_of_hearts.png",
    });
    await cardCollection.insertOne({
      number: 30,
      reference: "5_of_hearts.png",
    });
    await cardCollection.insertOne({
      number: 31,
      reference: "6_of_hearts.png",
    });
    await cardCollection.insertOne({
      number: 32,
      reference: "7_of_hearts.png",
    });
    await cardCollection.insertOne({
      number: 33,
      reference: "8_of_hearts.png",
    });
    await cardCollection.insertOne({
      number: 34,
      reference: "9_of_hearts.png",
    });
    await cardCollection.insertOne({
      number: 35,
      reference: "10_of_hearts.png",
    });
    await cardCollection.insertOne({
      number: 36,
      reference: "jack_of_hearts.png",
    });
    await cardCollection.insertOne({
      number: 37,
      reference: "queen_of_hearts.png",
    });
    await cardCollection.insertOne({
      number: 38,
      reference: "king_of_hearts.png",
    });
    await cardCollection.insertOne({
      number: 39,
      reference: "ace_of_hearts.png",
    });

    await cardCollection.insertOne({
      number: 40,
      reference: "2_of_spades.png",
    });
    await cardCollection.insertOne({
      number: 41,
      reference: "3_of_spades.png",
    });
    await cardCollection.insertOne({
      number: 42,
      reference: "4_of_spades.png",
    });
    await cardCollection.insertOne({
      number: 43,
      reference: "5_of_spades.png",
    });
    await cardCollection.insertOne({
      number: 44,
      reference: "6_of_spades.png",
    });
    await cardCollection.insertOne({
      number: 45,
      reference: "7_of_spades.png",
    });
    await cardCollection.insertOne({
      number: 46,
      reference: "8_of_spades.png",
    });
    await cardCollection.insertOne({
      number: 47,
      reference: "9_of_spades.png",
    });
    await cardCollection.insertOne({
      number: 48,
      reference: "10_of_spades.png",
    });
    await cardCollection.insertOne({
      number: 49,
      reference: "jack_of_spades.png",
    });
    await cardCollection.insertOne({
      number: 50,
      reference: "queen_of_spades.png",
    });
    await cardCollection.insertOne({
      number: 51,
      reference: "king_of_spades.png",
    });
    await cardCollection.insertOne({
      number: 52,
      reference: "ace_of_spades.png",
    });
  } catch (error) {
    console.log('hello i got errot')
  }
};

insertCardReference();