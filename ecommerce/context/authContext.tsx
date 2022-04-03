import { User } from "firebase/auth";
import React, { createContext, useState } from "react";
import { useAuth } from "../firebase/firebase";
//firebase fn
import {
  signUpWithEmailAndPassword,
  signUpWithFacebook,
  signUpWithGoogle,
  LoginWithEmailAndPassword,
  signOut,
} from "../firebase/firebase";
import { syncUserData } from "../utils/auth-request";
interface Props {
  children?: JSX.Element | JSX.Element[];
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type AuthContextType = {
  currentUser: User | null;
  hasError: boolean;
  isLoading: boolean;
  googleSignUpHandler: (type: string) => void | Promise<void>;
  emailAndPasswordSignUpHandler: (
    type: string,
    formValues: FormValues
  ) => void | Promise<void>;
  facebookSignUpHandler: (type: string) => void | Promise<void>;
  signOut: () => Promise<void> | void;
};

export const authContext = createContext<AuthContextType>({
  currentUser: null,
  hasError: false,
  isLoading: false,
  googleSignUpHandler: () => {},
  emailAndPasswordSignUpHandler: () => {},
  facebookSignUpHandler: () => {},
  signOut: () => {},
});

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const currentUser = useAuth();
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const googleSignUpHandler = async (type: string): Promise<void> => {
    try {
      setIsLoading(true);
      await signUpWithGoogle();
      await syncUserData(type);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const emailAndPasswordSignUpHandler = async (
    type: string,
    formValues: FormValues
  ): Promise<void> => {
    const { email, password, firstName, lastName } = formValues;
    setIsLoading(true);
    setHasError(false);
    try {
      type === "register"
        ? await signUpWithEmailAndPassword(email, password)
        : await LoginWithEmailAndPassword(email, password);
      await syncUserData(type, {
        firstName: firstName,
        lastName: lastName,
      });
    } catch (err: any) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const facebookSignUpHandler = async (type: string): Promise<void> => {
    try {
      setIsLoading(true);
      await signUpWithFacebook();
      await syncUserData(type);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <authContext.Provider
      value={{
        currentUser: currentUser,
        hasError: hasError,
        isLoading: isLoading,
        facebookSignUpHandler: facebookSignUpHandler,
        emailAndPasswordSignUpHandler: emailAndPasswordSignUpHandler,
        googleSignUpHandler: googleSignUpHandler,
        signOut: signOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
