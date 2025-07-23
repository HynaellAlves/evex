import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type UserContextType = {
  data: any;
  loading: boolean;
  setData: (data: any) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const save = localStorage.getItem("user");
    if (save) {
      setData(JSON.parse(save));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    }

    setLoading(false);
  }, [data]);

  return (
    <UserContext.Provider value={{ data, setData, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (!context) throw new Error("useAppContext deve estar dentro de AppProvider");
  return context;
}