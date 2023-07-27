import express from 'express';

import authenticationRoute from  "./authenticationHanldler.mjs"
import roomRoute from "./room.mjs"

const app  = express()

app.use("/authentication", authenticationRoute);
app.use("/room", roomRoute )

export default app;