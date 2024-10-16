import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private messaging;

  constructor() {
    const app = initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging(app);
  }

  requestPermission() {
    return getToken(this.messaging, { vapidKey: 'BHLQKqFNb8aV7JUQA5kYAJKUubC8vOJNoH92h28cNDBGyqU2FDmy6YUzI1iZy6umTWHwCBWSduJkfuSSviLijSQ' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Token received:', currentToken);
          // Save token to your database, or send it to the server
        } else {
          console.log('No registration token available.');
        }
      })
      .catch((err) => {
        console.log('Error getting token', err);
      });
  }

  receiveMessage() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
      // Process the message or show notifications here
    });
  }
}
