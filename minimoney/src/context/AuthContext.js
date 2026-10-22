import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseCliente";

const AuthContext = createContext(null);
const RECOVERY_STORAGE_KEY = "minimoney.password-recovery";

function getRecoveryState() {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const queryParams = new URLSearchParams(window.location.search);
  const isRecoveryLink =
    hashParams.get("type") === "recovery" ||
    queryParams.get("type") === "recovery";

  return isRecoveryLink || sessionStorage.getItem(RECOVERY_STORAGE_KEY) === "true";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(getRecoveryState);
  const userId = user?.id ?? null;
  const [perfil, setPerfil] = useState(null);
  const [perfilLoading, setPerfilLoading] = useState(true);

  const clearPasswordRecovery = () => {
    sessionStorage.removeItem(RECOVERY_STORAGE_KEY);
    setIsPasswordRecovery(false);
  };

  useEffect(() => {
    let ativo = true;
    // Verifica sessão existente
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!ativo) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listener de login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === "PASSWORD_RECOVERY") {
        sessionStorage.setItem(RECOVERY_STORAGE_KEY, "true");
        setIsPasswordRecovery(true);
      }

      if (event === "SIGNED_IN") {
        clearPasswordRecovery();
      }

      if (event === "SIGNED_OUT") {
        clearPasswordRecovery();
      }
    });

    async function carregarPerfil(userId) {
      if (!userId) {
        setPerfil(null);
        setPerfilLoading(false);
        return;
      }

      setPerfilLoading(true);

      const { data, error } = await supabase
        .from("USUARIO")
        .select("NOME")
        .eq("ID_AUTH_FK", userId)
        .maybeSingle();

      if (error) {
        console.error("Erro ao carregar perfil:", error);
        setPerfil(null);
      } else {
        setPerfil(data);
      }

      setPerfilLoading(false);
    }

    carregarPerfil(userId);
    return () => {
      ativo = false;
      listener.subscription.unsubscribe();
    };
  }, [userId]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        loading,
        isPasswordRecovery,
        clearPasswordRecovery,
        perfil,
        perfilLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useUserId() {
  const { userId } = useAuth();
  return userId;
}