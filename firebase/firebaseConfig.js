import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCEwFOzGMx9IJh2y7wrxMnB3IQ3orMqM3E",
  authDomain: "login-page-6c074.firebaseapp.com",
  projectId: "login-page-6c074",
  storageBucket: "login-page-6c074.firebasestorage.app",
  messagingSenderId: "997288660002",
  appId: "1:997288660002:web:70e9c9392eb8091f808e7b",
  measurementId: "G-PFELZDN1X9",
};

// Initialize the Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence and export it
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default app;