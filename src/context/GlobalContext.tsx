import { createContext, useState, useContext } from "react";

export interface IAuth {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface IGlobalState {
  auth?: IAuth;
  setAuth: (auth: IAuth) => void;
  removeAuth: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}

function getLocalState() {
  const auth = localStorage.getItem("@game") || undefined;
  return auth ? JSON.parse(auth) : auth;
}

export const GlobalContext = createContext({} as IGlobalState);

export const GlobalStateProvider = ({ children }: LayoutProps) => {
  const [auth, setAuthState] = useState<IAuth | undefined>(getLocalState);

  const setAuth = (auth: IAuth) => {
    localStorage.setItem("@game", JSON.stringify(auth));
    return setAuthState(auth);
  };

  const removeAuth = () => {
    localStorage.removeItem("@game");
    setAuthState(undefined);
  };

  return (
    <GlobalContext.Provider value={{ auth, setAuth, removeAuth }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  return context;
};
