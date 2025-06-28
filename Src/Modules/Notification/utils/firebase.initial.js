import admin from "firebase-admin";

import serviceAccount from '../../../../baseera-42207-firebase-adminsdk-fbsvc-3cc05e5104.json' with { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin
