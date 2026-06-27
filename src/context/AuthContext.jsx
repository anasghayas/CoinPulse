import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../users/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth changes (login, logout, register)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe; // Cleanup listener on component unmount
  }, []);

  // Listen to Firestore wishlist updates in real-time when user logged in
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }

    const docRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setWishlist(docSnap.data().wishlist || []);
      } else {
        setWishlist([]);
      }
    });

    return unsubscribe;
  }, [user]);

  const addToWishlist = async (coinId) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    try {
      await setDoc(docRef, {
        wishlist: arrayUnion(coinId)
      }, { merge: true });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (coinId) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    try {
      await setDoc(docRef, {
        wishlist: arrayRemove(coinId)
      }, { merge: true });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, wishlist, addToWishlist, removeFromWishlist }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to quickly access auth in any component
export const useAuth = () => useContext(AuthContext);
