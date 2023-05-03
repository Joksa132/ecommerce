"use client"

import { useState, createContext } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //const [user, setUser] = useState(JSON.parse(Cookies.get('user-info')))
  const userInfo = Cookies.get('user-info');
  const [user, setUser] = useState(userInfo ? JSON.parse(userInfo) : null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}