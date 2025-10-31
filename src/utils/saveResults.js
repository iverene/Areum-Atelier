import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

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
  }
}
