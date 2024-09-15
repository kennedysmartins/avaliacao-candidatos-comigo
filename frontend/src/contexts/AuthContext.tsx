"use client";
import { UserInfo } from "@/lib/types";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect, ReactNode } from "react";



interface AuthContextType {
  userInfo: UserInfo | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const getStoredUserInfo = () => {
      if (typeof window !== "undefined") {
        const storedUserInfo = localStorage.getItem("userInfo");
        return storedUserInfo ? (JSON.parse(storedUserInfo) as UserInfo) : null;
      }
      return null;
    };

    setUser(getStoredUserInfo());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (userInfo) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("token", userInfo.token);
        if (userInfo.token) {
          const options = {
            path: "/",
            maxAge: 60 * 60 * 24 * 31,
            sameSite: "strict",
            secure: true,
            httpOnly: true,
          };
          document.cookie = `token=${userInfo.token};path=${options.path};Max-Age=${options.maxAge};SameSite=${options.sameSite};Secure=${options.secure}`;
        }
      }
    }
  }, [userInfo]);

  const login = (token: string) => {
    try {
      const decodedToken = jwtDecode<UserInfo>(token);
      setUser({ ...decodedToken, token });
    } catch (error) {
      console.error("Invalid token", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    document.cookie = "token=;path=/;expires=Thu, 13 Sep 1996 12:05:00 GMT";
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
