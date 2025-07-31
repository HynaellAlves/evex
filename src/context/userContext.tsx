import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type UserContextType = {
  data: any;
  loading: boolean;
  setData: (data: any) => void;
  setRemenber: (data: any) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [remenber, setRemenber] = useState<boolean>(false);

  useEffect(() => {
    const saveLocal = localStorage.getItem("user");
    const saveSession = sessionStorage.getItem("user");

    // Verifica se há itens no Local ou no Session

    if (saveLocal) {
      setData(JSON.parse(saveLocal));
    } else if (saveSession) {
      setData(JSON.parse(saveSession));
    }
    setLoading(false);
  }, []);

  // Adiciona no Session Storage 

  useEffect(() => {
    if (data && !remenber) {
      sessionStorage.setItem("user", JSON.stringify(data));
    }
  }, [data, remenber]);

  // Adiciona no Local Storage 

  useEffect(() => {
    if (data && remenber) {
      localStorage.setItem("user", JSON.stringify(data));
    }
  }, [data, remenber]);

  return (
    <UserContext.Provider value={{ data, setData, loading, setRemenber }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAppContext deve estar dentro de AppProvider");
  return context;
}