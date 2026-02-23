"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserProfile } from "@/lib/user"; // Firestore user fetch

function mapFirebaseUser(user) {
  if (!user) return null;

  return {
    id: user.uid,
    email: user.email,
    name: user.displayName,
    photo: user.photoURL,
    provider: user.providerData?.[0]?.providerId || "password",
  };
}

export function useAuth() {
  const [user, setUser] = useState(null); // lenzroUser
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const baseUser = mapFirebaseUser(firebaseUser);

        // 🔥 fetch Lenzro profile (Firestore)
        const profile = await getUserProfile(firebaseUser.uid);

        const lenzroUser = {
          ...baseUser,
          ...profile, // role, businessId, etc
        };

        setUser(lenzroUser);
      } catch (err) {
        console.error("Failed to load user profile", err);
        setUser(mapFirebaseUser(firebaseUser));
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
