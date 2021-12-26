import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

const serviceAccount = require('../../firestore.creds.json');

admin.initializeApp(
	{
		credential: admin.credential.cert(serviceAccount),
		databaseURL: `http://${serviceAccount.project_id}.firebaseio.com`,
	}
);

const firestore = admin.firestore();
fireorm.initialize(firestore);