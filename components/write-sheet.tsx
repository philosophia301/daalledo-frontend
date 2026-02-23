"use client"

import { X } from "lucide-react"

const actions = [
  { emoji: "📸", label: "사진 찍어주실 분 찾기" },
  { emoji: "🍽️", label: "로컬 맛집/웨이팅 물어보기" },
  { emoji: "💬", label: "가벼운 동네 잡담하기" },
]

export function WriteSheet({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
        aria-label="닫기"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose()
        }}
      />

      {/* Sheet */}
      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl p-6 z-50 animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-gray-900">어떤 질문을 올려볼까요?</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="닫기"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="space-y-3">
          {actions.map((action) => (
            <button
              key={action.label}
              className="w-full text-left p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 active:bg-gray-100 flex items-center gap-4 transition-colors"
            >
              <span className="text-2xl" role="img" aria-hidden="true">
                {action.emoji}
              </span>
              <span className="font-medium text-gray-800 text-sm">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
