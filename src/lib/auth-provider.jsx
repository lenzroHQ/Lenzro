"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { clearSession } from "@/lib/workspace";

const AuthContext = createContext(null);

/**
 * Provides Firebase auth state throughout the app.
 * Wrap the root layout with this so any component can call `useAuthContext()`.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading, null = signed out
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signOut = useCallback(async () => {
    // 1. Sign out of Firebase (revokes the Firebase token)
    await firebaseSignOut(auth);

    // 2. Delete the server-side session cookie
    await fetch("/api/routes/session", { method: "DELETE" });

    // 3. Clear localStorage
    clearSession();

    // 4. Hard-redirect to /auth using window.location.replace so this URL
    //    is removed from browser history — the user cannot press Back to
    //    return to a protected page after signing out.
    window.location.replace("/auth");
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Access Firebase auth state from any client component */
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("useAuthContext must be used inside <AuthProvider>");
  return ctx;
}
