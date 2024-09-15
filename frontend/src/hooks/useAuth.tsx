"use client"
import { AuthContext } from "@/contexts/AuthContext"
import * as React from "react"

const useAuthInfo = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("authInfo must be used within a AuthProvider")
  }
  return context
}

export default useAuthInfo
