import { FirebaseApp, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBwUNOlvx-wwvztjwQDMOoHj-CZFxhxq40',
  authDomain: 'teleport-b43fa.firebaseapp.com',
  projectId: 'teleport-b43fa',
  storageBucket: 'teleport-b43fa.appspot.com',
  messagingSenderId: '132125337751',
  appId: '1:132125337751:web:e0eb750f6a9161038ba1d2',
  measurementId: 'G-5VEKGSEC1H',
  databaseURL: 'https://teleport-b43fa-default-rtdb.firebaseio.com',
};

class FirebaseService {
  private static app: FirebaseApp | null = null;

  public static getFirebaseAppInstance(): FirebaseApp {
    if (this.app === null) {
      this.app = initializeApp(firebaseConfig);
    }

    return this.app;
  }

  public static init(): void {
    this.app = initializeApp(firebaseConfig);
  }
}

export default FirebaseService;
