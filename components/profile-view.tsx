"use client"

import { useState, useRef, useEffect } from "react"
import { Check, Pencil } from "lucide-react"
import { useProfile, BADGES, type BadgeVariant } from "@/contexts/profile-context"

const EMOJI_OPTIONS = [
  "🐦", "🐱", "🐶", "🐰", "🦊", "🐻", "🐼", "🐨",
  "🦁", "🐯", "🐸", "🐵", "🦄", "🐧", "🐥", "🦋",
  "🐙", "🦀", "🐳", "🐬", "🌸", "🌻", "🍀", "⭐",
]

export function ProfileView() {
  const { emoji, nickname, badge, setEmoji, setNickname, setBadgeVariant } = useProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [draft, setDraft] = useState(nickname)
  const inputRef = useRef<HTMLInputElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  useEffect(() => {
    if (!isEmojiPickerOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target as Node)) {
        setIsEmojiPickerOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isEmojiPickerOpen])

  function handleSave() {
    const trimmed = draft.trim()
    if (trimmed) {
      setNickname(trimmed)
    }
    setDraft(trimmed || nickname)
    setIsEditing(false)
  }

  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <h1 className="font-bold text-gray-900">👤 내 정보</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-4 mb-5">
            <div className="relative" ref={emojiPickerRef}>
              <button
                type="button"
                onClick={() => setIsEmojiPickerOpen((v) => !v)}
                className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl shrink-0 hover:bg-gray-200 active:bg-gray-200 transition-colors group"
                aria-label="프로필 이모지 변경"
              >
                {emoji}
                <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white shadow flex items-center justify-center text-[10px] text-gray-400 group-hover:text-gray-600 transition-colors">
                  <Pencil className="w-2.5 h-2.5" />
                </span>
              </button>

              {isEmojiPickerOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-3 grid grid-cols-6 gap-1 z-30 w-[220px] animate-in fade-in slide-in-from-top-1 duration-150">
                  {EMOJI_OPTIONS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => {
                        setEmoji(e)
                        setIsEmojiPickerOpen(false)
                      }}
                      className={`w-8 h-8 flex items-center justify-center text-xl rounded-lg transition-colors ${
                        emoji === e ? "bg-blue-50 ring-2 ring-blue-400" : "hover:bg-gray-100 active:bg-gray-200"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave()
                      if (e.key === "Escape") {
                        setDraft(nickname)
                        setIsEditing(false)
                      }
                    }}
                    maxLength={12}
                    className="flex-1 min-w-0 text-lg font-bold text-gray-900 bg-gray-50 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                  <button
                    onClick={handleSave}
                    className="shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center active:bg-blue-600 transition-colors"
                    aria-label="닉네임 저장"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900 truncate">
                    {nickname}
                  </span>
                  <button
                    onClick={() => {
                      setDraft(nickname)
                      setIsEditing(true)
                    }}
                    className="shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 active:bg-gray-200 transition-colors"
                    aria-label="닉네임 수정"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Badge selector */}
          <div className="flex gap-2 mb-5">
            {BADGES.map((b) => (
              <button
                key={b.variant}
                type="button"
                onClick={() => setBadgeVariant(b.variant)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                  badge.variant === b.variant
                    ? b.variant === "local"
                      ? "bg-blue-50 text-blue-600 ring-2 ring-blue-400"
                      : "bg-orange-50 text-orange-600 ring-2 ring-orange-400"
                    : "bg-gray-50 text-gray-400"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 border-t border-gray-100 pt-4 text-center">
            <div>
              <p className="text-lg font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-400 mt-0.5">채팅</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">3</p>
              <p className="text-xs text-gray-400 mt-0.5">도움</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">47</p>
              <p className="text-xs text-gray-400 mt-0.5">좋아요</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
