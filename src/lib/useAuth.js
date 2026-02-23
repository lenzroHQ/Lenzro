// src/lib/useAuth.js
"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [lenzrouser, setLenzrouser] = useState(null);

  useEffect(() => {
    // Try to get user from localStorage
    const storedUser = localStorage.getItem("lenzrouser");
    const cookieUser = Cookies.get("lenzrouser");

    if (storedUser && cookieUser) {
      try {
        setLenzrouser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
        setLenzrouser(null);
      }
    } else {
      setLenzrouser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("lenzrouser");
    Cookies.remove("lenzrouser");
    setLenzrouser(null);
  };

  return { lenzrouser, logout };
};
