import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider, firebaseInitError } from '../config/firebase'

const AuthContext = createContext(null)

function authUnavailableError() {
  return firebaseInitError || new Error('Firebase auth is not configured.')
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return undefined
    }

    try {
      const unsub = onAuthStateChanged(auth, (u) => {
        setUser(u)
        setLoading(false)
      })
      return unsub
    } catch (error) {
      console.warn('Firebase auth listener could not be started.', error)
      setLoading(false)
      return undefined
    }
  }, [])

  const login = (email, password) =>
    auth ? signInWithEmailAndPassword(auth, email, password) : Promise.reject(authUnavailableError())

  const register = async (email, password, displayName) => {
    if (!auth) throw authUnavailableError()
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) await updateProfile(cred.user, { displayName })
    return cred
  }

  const loginWithGoogle = () =>
    auth && googleProvider ? signInWithPopup(auth, googleProvider) : Promise.reject(authUnavailableError())

  const logout = () => (auth ? signOut(auth) : Promise.resolve())

  const resetPassword = (email) =>
    auth ? sendPasswordResetEmail(auth, email) : Promise.reject(authUnavailableError())

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout, resetPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
