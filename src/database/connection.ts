import { initializeApp, cert } from 'firebase-admin/app';

const serviceAccount = require('../../firestore.creds.json');

initializeApp({
	credential: cert(serviceAccount)
});
