"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

// Normalize Firebase user → app user
function mapUser(user) {
  if (!user) return null;

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photo: user.photoURL,
    provider: user.providerData?.[0]?.providerId || "password",
  };
}

/**
 * Email signup
 */
export async function signUp(email, password) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return mapUser(cred.user);
  } catch (err) {
    throw new Error(getAuthError(err));
  }
}

/**
 * Email login
 */
export async function signIn(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return mapUser(cred.user);
  } catch (err) {
    throw new Error(getAuthError(err));
  }
}

/**
 * Google login (popup → redirect fallback)
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return mapUser(result.user);
  } catch (err) {
    // Popup blocked → fallback to redirect
    if (
      err.code === "auth/popup-blocked" ||
      err.code === "auth/popup-closed-by-user"
    ) {
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    throw new Error(getAuthError(err));
  }
}

/**
 * Handle redirect result (call on app load)
 */
export async function handleRedirectResult() {
  const result = await getRedirectResult(auth);
  return result?.user ? mapUser(result.user) : null;
}

/**
 * Logout
 */
export async function logout() {
  await firebaseSignOut(auth);
}

/**
 * Human-friendly Firebase errors
 */
function getAuthError(err) {
  switch (err.code) {
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/email-already-in-use":
      return "Email already registered.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    default:
      return err.message || "Authentication failed.";
  }
}
