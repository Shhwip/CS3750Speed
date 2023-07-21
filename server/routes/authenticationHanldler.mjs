import express from "express";
import db from "../config/db.mjs";
import session from "express-session";
import storeSession from "../config/storeSession.mjs";

const router = express.Router();

// Define the session options
const sessionOptions = {
  secret: process.env.MY_SECRET_KEY,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  },
  store: storeSession,
  resave: false,
  saveUninitialized: false,
};

// Define the session middleware
const sessionMiddleware = session(sessionOptions);

// Create a helper function to check if user exists
async function checkUserExist(collection, userName, email) {
  const foundUserName = await collection.findOne({ userName });
  const foundUserEmail = await collection.findOne({ email });

  if (foundUserName && foundUserEmail) {
    return { existUserName: true, existEmail: true };
  } else if (foundUserName) {
    return { existUserName: true, existEmail: false };
  } else if (foundUserEmail) {
    return { existUserName: false, existEmail: true };
  }

  return null;
}

// Define the register endpoint
router.post("/register", async (req, res) => {
  const { userName, email, password, salt } = req.body;
  let collection = await db.collection("userAuthentication");

  const userExist = await checkUserExist(collection, userName, email);
  if (userExist) {
    console.log(userExist);
    return res.status(409).send(userExist);
  }

  let result = await collection.insertOne({ userName, email, password, salt });
  sessionMiddleware(req, res, () => {
    req.session.user = { email }; // Save user to session upon successful registration
    
  });
  res.status(200).send(result);
});

//get salt
router.post("/getSalt", async (req, res) => {
  const { email } = req.body;

  // Fetch user from database
  const collection = await db.collection("userAuthentication");
  
  const user = await collection.findOne({email: email });
  if (!user) {
    res.status(404).send("Not found");
  } else {
    res.status(200).send({ salt: user.salt });
  }
 
});

// Define the login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const collection = await db.collection("userAuthentication");
  const user = await collection.findOne({ email });

  if (user.password === password) {
    sessionMiddleware(req, res, () => {
      req.session.user = { email }; // Save user to session
      res.status(200).send({ match: true });
    });
  } else {
    res.status(200).send({ match: false });
  }
});

export default router;
