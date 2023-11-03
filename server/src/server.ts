'use strict';

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models/index"
import cardRouter from "./routes/card.route"

const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

app.use('/api/cards', cardRouter);

db.mongoose.connect(db.url).then(() => {
    console.log("connected to db")
}).catch(() => {
    console.log("Cannot connect to db")
    process.exit()
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});