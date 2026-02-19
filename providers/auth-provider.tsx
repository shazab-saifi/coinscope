import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  hasSkippedAuth: boolean;
  isSkipAuthLoading: boolean;
  setSkippedAuth: (value: boolean) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  hasSkippedAuth: false,
  isSkipAuthLoading: true,
  setSkippedAuth: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasSkippedAuth, setHasSkippedAuth] = useState<boolean>(false);
  const [isSkipAuthLoading, setIsSkipAuthLoading] = useState<boolean>(true);

  const setSkippedAuth = async (value: boolean) => {
    setHasSkippedAuth(value);
    await AsyncStorage.setItem("hasSkippedAuth", value ? "true" : "false");
  };

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
      })
      .finally(() => {
        setIsLoading(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("hasSkippedAuth")
      .then((value) => {
        setHasSkippedAuth(value === "true");
      })
      .finally(() => {
        setIsSkipAuthLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        hasSkippedAuth,
        isSkipAuthLoading,
        setSkippedAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
