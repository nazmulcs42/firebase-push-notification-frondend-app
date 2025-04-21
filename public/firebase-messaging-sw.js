// This file is used to handle background messages for Firebase Cloud Messaging.
// It is a service worker that listens for messages when the web app is not in the foreground.
// It is important to note that this file must be in the root of the public directory
// and must be registered in the main JavaScript file of the web app.
// The service worker must be registered in the main JavaScript file of the web app.

importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// const firebaseConfig = {
//     apiKey: "AIzaSyBh-2-U37mrK0gO8TPLK8yw1AcOwzBBfZY",
//     authDomain: "jexca-web-test-v-2.firebaseapp.com",
//     databaseURL: "https://jexca-web-test-v-2.firebaseio.com",
//     projectId: "jexca-web-test-v-2",
//     storageBucket: "jexca-web-test-v-2.appspot.com",
//     messagingSenderId: "755544043599",
//     appId: "1:755544043599:web:3e85732db5bea83544fa3a"
// };

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

console.log('[firebase-messaging-sw.js] firebaseConfig', firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log('[firebase-messaging-sw.js] initializeApp successful');

const messaging = firebase.messaging();

console.log('[firebase-messaging-sw.js] messaging', messaging);

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: "/firebase-logo.png",
  });
});
