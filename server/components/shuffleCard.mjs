import db from "../config/db.mjs";

export default async function reshuffleCard() {
  let cardCollection = db.collection("cardCollection");
  let cards = await cardCollection.find({}).toArray();

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards.map((card) => card.reference);
}
