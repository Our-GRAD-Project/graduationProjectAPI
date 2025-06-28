import admin from "firebase-admin";
import dotenv from "dotenv"
dotenv.config()
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig)
});

export default admin
