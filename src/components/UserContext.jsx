// src/UserContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Obtener el usuario actual al cargar la app
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }

    getUser()

    // Escuchar cambios de sesión (login, logout, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Limpieza del listener
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

// Hook personalizado para acceder al contexto
export function useUser() {
  return useContext(UserContext)
}
