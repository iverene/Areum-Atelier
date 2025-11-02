import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("✅ Firestore connected successfully:", db);

export async function saveQuizResult(data) {
  try {
    const docRef = await addDoc(collection(db, "makeup_results"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    console.log("Document saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving document:", error);
    throw error; 
  }
}

export { db };