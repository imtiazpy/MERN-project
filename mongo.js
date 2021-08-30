import mongoose from "mongoose"

const log = (msg) => console.log(msg);


export const uri = "mongodb://localhost:27017/parcelkoi";
const options = {};
export const connectWithDb = () => {
    mongoose.connect(uri, options, (err, db) => {
        if (err) {
            console.error(err);
        }
        else log("database connection established");
    })
}

