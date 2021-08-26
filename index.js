import express from "express";
import configure from "./controllers";
import connectWithDb from "./mongo";

const port = 3000;
const app = express();

app.use(express.json());

const log = (msg) => console.log(msg);


connectWithDb();

configure(app);


app.listen(port, () => {
    log("Listening to port " + port);
})

