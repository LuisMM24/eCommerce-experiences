import React, { createContext } from "react";
import { useAuth } from "../firebase/firebase";

type AuthContextType = {
  currentUser: void | null;
};

export const authContext = createContext<AuthContextType>({
  currentUser: null,
});

interface Props {
  children?: JSX.Element;
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const currentUser = useAuth();

  return (
    <authContext.Provider
      value={{
        currentUser: currentUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
