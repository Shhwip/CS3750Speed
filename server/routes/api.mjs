import express from 'express';

import authenticationRoute from  "./authenticationHanldler.mjs"

const app  = express()

app.use("/authentication", authenticationRoute);

export default app;