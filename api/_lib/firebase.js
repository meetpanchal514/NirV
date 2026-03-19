const admin = require('firebase-admin')

function getFirestore() {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      })
    } catch (err) {
      console.warn('Firebase Admin not initialized:', err.message)
      return null
    }
  }
  return admin.firestore()
}

async function addDocument(collection, data) {
  const db = getFirestore()
  if (!db) return { id: `mock-${Date.now()}` }
  const ref = await db.collection(collection).add({ ...data, createdAt: new Date() })
  return { id: ref.id }
}

async function getDocument(collection, id) {
  const db = getFirestore()
  if (!db) return null
  const doc = await db.collection(collection).doc(id).get()
  return doc.exists ? { id: doc.id, ...doc.data() } : null
}

async function getCollection(collection, filters = []) {
  const db = getFirestore()
  if (!db) return []
  let query = db.collection(collection)
  filters.forEach(({ field, op, value }) => { query = query.where(field, op, value) })
  const snap = await query.get()
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

module.exports = { addDocument, getDocument, getCollection }
