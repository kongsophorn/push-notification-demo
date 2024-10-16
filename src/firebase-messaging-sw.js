
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCAipIKIIY99J3agXbLxku17rmKwOAeqE0",
    authDomain: "hello-4dd60.firebaseapp.com",
    projectId: "hello-4dd60",
    storageBucket: "hello-4dd60.appspot.com",
    messagingSenderId: "952347199060",
    appId: "1:952347199060:web:037034597fef23817fcfc1",
    measurementId: "G-MEXJ0V3S0F"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Optional icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
