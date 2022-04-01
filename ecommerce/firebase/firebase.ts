// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  PopupRedirectResolver,
  UserCredential,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6568zRcsZC9zd6gXbKSG9zbK-B1C3VGM",
  authDomain: "experiences-ecommerce-6dbc8.firebaseapp.com",
  projectId: "experiences-ecommerce-6dbc8",
  storageBucket: "experiences-ecommerce-6dbc8.appspot.com",
  messagingSenderId: "1022290566294",
  appId: "1:1022290566294:web:c74ac716c696c5c96036b7",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const signUpWithGoogle = (): Promise<UserCredential> => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider);
};

export const signUpWithFacebook = (): Promise<UserCredential> => {
  const facebookProvider = new FacebookAuthProvider();
  return signInWithPopup(auth, facebookProvider);
};

export const signUpWithEmailAndPassword = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const LoginWithEmailAndPassword = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const getUserToken = (): Promise<string> | null => {
  if (!auth.currentUser) {
    return null;
  }
  return auth.currentUser.getIdToken();
};

export const signOut = (): Promise<void> => {
  return auth.signOut();
};

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return setCurrentUser(user);
      }
      return setCurrentUser(null);
    });
  }, []);
  return currentUser;
};
