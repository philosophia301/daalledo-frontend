"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type BadgeVariant = "local" | "visitor"

export interface Badge {
  label: string
  variant: BadgeVariant
}

export const BADGES: Badge[] = [
  { label: "📍 여기 있어요", variant: "local" },
  { label: "🎒 방문 예정", variant: "visitor" },
]

const EMOJI_OPTIONS = [
  "🐦", "🐱", "🐶", "🐰", "🦊", "🐻", "🐼", "🐨",
  "🦁", "🐯", "🐸", "🐵", "🦄", "🐧", "🐥", "🦋",
  "🐙", "🦀", "🐳", "🐬", "🌸", "🌻", "🍀", "⭐",
]

const NICKNAMES = [
  "갈매기", "바다사자", "해운대꿀벌", "광안리파도",
  "국밥킬러", "어묵달인", "씨앗호떡", "밀면장인",
  "돼지국밥", "자갈치고수", "태종대바람", "감천별빛",
  "송정서퍼", "기장멸치", "영도다리", "남포동쥔장",
  "센텀러너", "동백섬산책", "온천천오리", "부평시장",
  "초량밀면", "해리단길", "다대포석양", "이기대탐험",
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const STORAGE_KEY = "daalledo-profile"

interface StoredProfile {
  emoji: string
  nickname: string
  badgeVariant: BadgeVariant
}

function loadProfile(): StoredProfile | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveProfile(profile: StoredProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

interface ProfileState {
  emoji: string
  nickname: string
  badge: Badge
  setEmoji: (emoji: string) => void
  setNickname: (nickname: string) => void
  setBadgeVariant: (variant: BadgeVariant) => void
  ready: boolean
}

const ProfileContext = createContext<ProfileState | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [emoji, setEmojiState] = useState("")
  const [nickname, setNicknameState] = useState("")
  const [badgeVariant, setBadgeVariantState] = useState<BadgeVariant>("local")
  const [ready, setReady] = useState(false)

  // Load from localStorage on mount, or generate random
  useEffect(() => {
    const stored = loadProfile()
    if (stored) {
      setEmojiState(stored.emoji)
      setNicknameState(stored.nickname)
      setBadgeVariantState(stored.badgeVariant)
    } else {
      const randomEmoji = pick(EMOJI_OPTIONS)
      const randomNickname = pick(NICKNAMES)
      setEmojiState(randomEmoji)
      setNicknameState(randomNickname)
      setBadgeVariantState("local")
      saveProfile({ emoji: randomEmoji, nickname: randomNickname, badgeVariant: "local" })
    }
    setReady(true)
  }, [])

  const setEmoji = (v: string) => {
    setEmojiState(v)
    const stored = loadProfile()
    saveProfile({ emoji: v, nickname: stored?.nickname ?? nickname, badgeVariant: stored?.badgeVariant ?? badgeVariant })
  }

  const setNickname = (v: string) => {
    setNicknameState(v)
    const stored = loadProfile()
    saveProfile({ emoji: stored?.emoji ?? emoji, nickname: v, badgeVariant: stored?.badgeVariant ?? badgeVariant })
  }

  const setBadgeVariant = (v: BadgeVariant) => {
    setBadgeVariantState(v)
    const stored = loadProfile()
    saveProfile({ emoji: stored?.emoji ?? emoji, nickname: stored?.nickname ?? nickname, badgeVariant: v })
  }

  const badge = BADGES.find((b) => b.variant === badgeVariant) ?? BADGES[0]

  return (
    <ProfileContext value={{ emoji, nickname, badge, setEmoji, setNickname, setBadgeVariant, ready }}>
      {children}
    </ProfileContext>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider")
  return ctx
}
