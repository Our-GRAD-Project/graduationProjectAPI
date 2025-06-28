import admin from "./firebase.initial.js";

export const sendNotification = (fcmToken, title, body)=>{
    return admin.messaging().send({
        token: fcmToken,
        notification: {
            title,
            body
        }
    })
}