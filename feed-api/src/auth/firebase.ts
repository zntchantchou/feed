import * as firebaseAdmin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

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

export async function listUsers(pageToken?: string) {
  // Start listing users from the beginning, 1000 at a time.
  const result = await getAuth().listUsers(100);
  const users = result?.users.map(({ providerData }) => {
    const { phoneNumber, ...userData } = providerData[0];
    return userData;
  });
  // if (result.pageToken) {
  //   // List next batch of users.
  //   listUsers(result.pageToken);
  // }
  return users;
}
