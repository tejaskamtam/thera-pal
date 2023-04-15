// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'thera-pal.firebaseapp.com',
  projectId: 'thera-pal',
  storageBucket: 'thera-pal.appspot.com',
  messagingSenderId: '1000937330273',
  appId: '1:1000937330273:web:31fbe44175780731f97c20',
  measurementId: 'G-7HTRVJYQKK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
