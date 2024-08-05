import { setGlobalOptions } from 'firebase-functions/v2';
import app from './server.js';
import { onRequest } from 'firebase-functions/v2/https';

setGlobalOptions({
    region: 'europe-west1',
});

export const server = onRequest(app);

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
