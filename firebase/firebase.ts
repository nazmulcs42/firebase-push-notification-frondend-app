// This file is used to handle background messages for Firebase Cloud Messaging.
// It is a service worker that listens for messages when the web app is not in the foreground.
// It is important to note that this file must be in the root of the public directory
// and must be registered in the main JavaScript file of the web app.
// The service worker must be registered in the main JavaScript file of the web app.

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APP_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_APP_FIREBASE_MEASUREMENT_ID,
};
console.log('[firebase.ts] firebaseConfig', firebaseConfig);

const app = initializeApp(firebaseConfig);
console.log('[firebase.ts] app', app);

const messaging = typeof window !== "undefined" ? getMessaging(app) : null;
console.log('[firebase.ts] messaging', messaging);

export { messaging, getToken, onMessage };
