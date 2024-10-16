
import { RouterOutlet } from '@angular/router';
import { MyComponentComponent } from './my-component/my-component.component';

import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { MessagingService } from './messaging.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'push-notification-demo';

  user = {
    name: '',
    age: null,
    email: ''
  };

  // Initialize Firebase
  private db;

  constructor( private messagingService: MessagingService) {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(app);
    initializeApp(environment.firebaseConfig);

    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
  }
  

  async addUser() {
    const usersCollection = collection(this.db, 'users');
    try {
      const docRef = await addDoc(usersCollection, this.user);
      console.log("Document written with ID: ", docRef.id);
      this.user = { name: '', age: null, email: '' };
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }


  
}
