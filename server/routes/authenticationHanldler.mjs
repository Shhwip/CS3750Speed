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
  const { userName, email, password, salt, } = req.body;
  let collection = await db.collection("userAuthentication");

  let recordCollection = await db.collection("records");
  let newDocument = {
    name: userName,
    gamesplayed: 0,
    gameswon: 0,
    highscore: 0,
  };


  console.log(req.body);

  const userExist = await checkUserExist(collection, userName, email);
  if (userExist) {
    console.log(userExist);
    return res.status(409).send(userExist);
  }

  let result = await collection.insertOne({ userName, email, password, salt, });
  let recordResult = await recordCollection.insertOne(newDocument);
  sessionMiddleware(req, res, () => {
    req.session.user = { userName }; // Save user to session upon successful registration
  });
  res.status(200).send(result);
});

//get salt
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

// Define the login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const collection = await db.collection("userAuthentication");
  const user = await collection.findOne({ email });
  if(!user){
    res.status(200).send({ match: false });
  }
  const userName = user.userName
  if (user.password === password) {
    sessionMiddleware(req, res, () => {
      req.session.user = { userName }; // Save user to session
      res.status(200).send({ match: true });
    });
  } else {
    res.status(200).send({ match: false });
  }
});

router.post('/logout', (req, res) => {
  sessionMiddleware(req, res, () =>{
    req.session.destroy((err) => {
      if(err) {
        
        return res.status(500).send({msg: 'Error logging out'});
      }
      res.clearCookie('connect.sid');
      res.status(200).send({msg: "Logout success"})
    })
  })
  

})

router.get("/isAuth", async (req, res) => {
  sessionMiddleware(req, res, () => {
    if (req.session.user) {
      console.log(req.session.user);
      return res.json(req.session.user);
    } else {
      return res.status(401).json("unauthorize");
    }
  });
});

export default router;
