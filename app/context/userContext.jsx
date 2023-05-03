"use client"

import { useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userInfo = Cookies.get('user-info');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setUser(JSON.parse(userInfo))
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}