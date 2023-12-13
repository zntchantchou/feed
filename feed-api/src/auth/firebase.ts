import * as firebaseAdmin from 'firebase-admin';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  credential: firebaseAdmin.credential.cert(
    'config_secrets/firebase-credentials.json',
  ),
};

const app = firebaseAdmin.initializeApp(firebaseConfig);

export default app;
