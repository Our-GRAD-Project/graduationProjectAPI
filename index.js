import express from "express";
import dotenv from "dotenv";
import connectToDb from "./DataBase/DBconnection.js";
import { bootstrap } from "./bootstrap.js";
import {v2 as cloudinary} from 'cloudinary';

const app = express();
dotenv.config();
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});
const port = +process.env.PORT;

connectToDb();
bootstrap(app);

app.listen(port, () => console.log(`listening on port ${port}!`));
