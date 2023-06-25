import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, AuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAgoNsVTQjQbMm5lmG6e1ouy0qecVHuky8',
  authDomain: 'blog-f64bc.firebaseapp.com',
  projectId: 'blog-f64bc',
  storageBucket: 'blog-f64bc.appspot.com',
  messagingSenderId: '558854756137',
  appId: '1:558854756137:web:7788ae9d893f12f0e3c938',
  measurementId: 'G-2VV82ZBXHC',
  databaseURL: 'https://blog-f64bc-default-rtdb.firebaseio.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export function signInWithSocialMedia(provider: AuthProvider) {
  signInWithRedirect(auth, provider);
}

export { app, auth, db };
