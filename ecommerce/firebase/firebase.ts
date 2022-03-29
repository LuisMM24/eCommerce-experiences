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
} from "firebase/auth";
import React, { useEffect } from "react";
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

export const signUpWithGoogle = (): PopupRedirectResolver => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider);
};

export const signUpWithFacebook = (): PopupRedirectResolver => {
  const facebookProvider = new FacebookAuthProvider();
  return signInWithPopup(auth, facebookProvider);
};

export const signUpWithEmailAndPassword = (
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
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
    });
  }, []);
};
