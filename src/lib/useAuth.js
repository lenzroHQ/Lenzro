// lib/useAuth.ts
"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

export function useAuth() {
  const [lenzrouser, setLenzrouser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLenzrouser(user);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { lenzrouser, loading };
}
