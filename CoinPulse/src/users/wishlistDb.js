import { db } from "./firebase";
import { doc, setDoc, arrayUnion } from "firebase/firestore";

async function addCoinToWishlist(userId, coinId) {
  await setDoc(doc(db, "users", userId), {
    wishlist: arrayUnion(coinId)
  }, { merge: true });
}
