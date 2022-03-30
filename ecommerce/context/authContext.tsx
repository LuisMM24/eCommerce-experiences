import React, { createContext, useState } from "react";
import { useAuth } from "../firebase/firebase";
//firebase fn
import {
  signUpWithEmailAndPassword,
  signUpWithFacebook,
  signUpWithGoogle,
  LoginWithEmailAndPassword,
} from "../firebase/firebase";
import { syncUserData } from "../utils/auth-request";
interface Props {
  children?: JSX.Element;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type AuthContextType = {
  currentUser: void | null;
  hasError: boolean;
  isLoading: boolean;
  googleSignUpHandler: (type: string) => void | Promise<void>;
  emailAndPasswordSignUpHandler: (
    type: string,
    formValues: FormValues
  ) => void | Promise<void>;
  facebookSignUpHandler: (type: string) => void | Promise<void>;
};

export const authContext = createContext<AuthContextType>({
  currentUser: null,
  hasError: false,
  isLoading: false,
  googleSignUpHandler: () => {},
  emailAndPasswordSignUpHandler: () => {},
  facebookSignUpHandler: () => {},
});

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const currentUser = useAuth();

  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const googleSignUpHandler = async (type: string): Promise<void> => {
    try {
      await signUpWithGoogle();
      await syncUserData(type);
      console.log("Done!");
    } catch (err: any) {
      console.log(err.message);
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
      await signUpWithFacebook();
      await syncUserData(type);
      console.log("Done!");
    } catch (err: any) {
      console.log(err.message);
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
      }}
    >
      {children}
    </authContext.Provider>
  );
};
