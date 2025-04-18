import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        setUser(data.session?.user || null)
      } catch (error) {
        console.error('Error checking session:', error.message)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
        setLoading(false)
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      
      if (error) {
        throw error
      }
      
      toast.success('Logged in successfully!')
      return { success: true }
    } catch (error) {
      toast.error(error.message || 'Failed to login')
      return { success: false, error }
    }
  }

  const register = async (email, password, fullName) => {
    try {
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })
      
      if (error) {
        throw error
      }
      
      toast.success('Registration successful! Please check your email for verification.')
      return { success: true, data }
    } catch (error) {
      toast.error(error.message || 'Failed to register')
      return { success: false, error }
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw error
      }
      
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error(error.message || 'Failed to logout')
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
} 