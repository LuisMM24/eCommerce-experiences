import { PopupRedirectResolver, UserCredential } from "firebase/auth";
import { createContext } from "react";
import {
  signUpWithGoogle,
  signUpWithFacebook,
  signUpWithEmailAndPassword,
} from "../firebase/firebase";

type AuthContextType = {
  signUpWithFacebook: () => PopupRedirectResolver;
  signUpWithGoogle: () => PopupRedirectResolver;
  signUpWithEmailAndPassword: (
    password: string,
    email: string
  ) => Promise<UserCredential>;
  currentUser: string | null;
};

const authContext = createContext<AuthContextType>({
  signUpWithFacebook: signUpWithFacebook,
  signUpWithGoogle: signUpWithGoogle,
  signUpWithEmailAndPassword: signUpWithEmailAndPassword,
  currentUser: null,
});
