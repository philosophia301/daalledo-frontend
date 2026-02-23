"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ProfileState {
  emoji: string
  nickname: string
  setEmoji: (emoji: string) => void
  setNickname: (nickname: string) => void
}

const ProfileContext = createContext<ProfileState | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [emoji, setEmoji] = useState("🐦")
  const [nickname, setNickname] = useState("익명의 갈매기")

  return (
    <ProfileContext value={{ emoji, nickname, setEmoji, setNickname }}>
      {children}
    </ProfileContext>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider")
  return ctx
}
