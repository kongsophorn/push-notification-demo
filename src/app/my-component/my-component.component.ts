
import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { getMessaging, getToken, onMessage } from 'firebase/messaging';

@Component({
  selector: 'app-my-component',
  standalone: true,

  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.scss',
  imports: [FormsModule
            
],
})
export class MyComponentComponent {
 


  async requestPermission(messaging: any) {
    // Check current notification permission status
    const currentPermission = Notification.permission;
    console.log("Current Notification Permission:", currentPermission);

    if (currentPermission === 'default') {
        // Ask for permission if not already granted or denied
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                const token = await getToken(messaging, { vapidKey: 'BL1D62TX816v0xpzVh545NaoFE31ec62HTdM2Ta0JkkVVYkKo6-0Pk2HilTL3AHIM51rJ107bqLToDYQl08I3Dk' });
                console.log("Token: ", token);
            } else {
                console.error("Notification permission denied.");
            }
        } catch (error) {
            console.error("Error requesting notification permission: ", error);
        }
    } else if (currentPermission === 'denied') {
        console.error("Notification permission was previously denied. Please enable it manually in the browser.");
    }
}
}