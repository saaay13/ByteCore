// UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);

        const { data: perfilData, error } = await supabase
          .from("perfiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (!error) {
          setPerfil(perfilData);
        } else {
          console.warn("⚠️ No se encontró perfil:", error.message);
        }
      }

      setLoading(false);
    };

    fetchUserAndProfile();

    // Escucha cambios en sesión (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUserAndProfile();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, perfil, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
