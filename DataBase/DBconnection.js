import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectToDb = () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => console.log("connection established...:)"))
    .catch(() => console.log("connection failed...:("));
};

export default connectToDb;
