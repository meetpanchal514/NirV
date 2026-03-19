import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId']
const hasFirebaseConfig = requiredKeys.every((key) => {
  const value = firebaseConfig[key]
  return typeof value === 'string' && value.trim().length > 0
})

let app = null
let auth = null
let db = null
let storage = null
let googleProvider = null
let firebaseInitError = null

if (hasFirebaseConfig) {
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
    googleProvider = new GoogleAuthProvider()
  } catch (error) {
    firebaseInitError = error
    console.warn('Firebase client initialization failed. Auth features are disabled until env values are fixed.', error)
  }
} else {
  firebaseInitError = new Error('Firebase client env vars are missing.')
  console.warn('Firebase client env vars are missing. Auth features are disabled until env values are configured.')
}

export { app, auth, db, storage, googleProvider, hasFirebaseConfig, firebaseInitError }
export default app
