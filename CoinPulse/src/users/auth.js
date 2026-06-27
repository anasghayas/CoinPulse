import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Call these during form submissions
const handleSignUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const handleLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);
