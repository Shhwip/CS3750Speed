import express from "express";
import db from "../config/db.mjs";
import session from "express-session";
import storeSession from "../config/storeSession.mjs";

const router = express.Router();

router.use(
  session({
    secret: process.env.MY_SECRET_KEY,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    },
    store: storeSession,
    resave: true,
    saveUninitialized: true,
  })
);

router.post("/register", async (req, res) => {
  console.log(req.body);
  let newDocument = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    salt: req.body.salt,
  };
  let collection = await db.collection("userAuthentication");
  const foundUserName = await collection.findOne({
    userName: newDocument.userName,
  });
  const foundUserEmail = await collection.findOne({
    email: newDocument.userName,
  });
  if (foundUserName) {
    return res.status(409).send({ message: "Username is already in use." });
  }
  if (foundUserEmail) {
    return res.status(409).send({ message: "Email is already in use." });
  }
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

router.post("/getSalt", async (req, res) => {
  const { email } = req.body;

  // Fetch user from database
  const collection = await db.collection("userAuthentication");

  const user = await collection.findOne({ email: email });
  if (!user) {
    res.status(404).send("Not found");
  } else {
    res.status(200).send({ salt: user.salt });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const collection = await db.collection("userAuthentication");
  const user = await collection.findOne({ userName: name });

  if (user.password === password) {
    req.session.user = { email: user.email }; // Save user to session
    res.status(200).send({ match: true });
  } else {
    res.status(200).send({ match: false });
  }

});

export default router;
