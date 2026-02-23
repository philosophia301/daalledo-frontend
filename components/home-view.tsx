"use client"

import { useState, useRef, useEffect } from "react"
import { Send, ImagePlus } from "lucide-react"
import { useChat, type ChatMessage } from "@/hooks/use-chat"

function HomeHeader({ onlineCount }: { onlineCount: number }) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-1.5 font-bold text-gray-900">
        <span className="text-lg" role="img" aria-label="위치 핀">📍</span>
        <span>현재: 해운대구 우동</span>
      </div>
      <div className="text-orange-500 text-sm font-medium">
        <span role="img" aria-label="불꽃">🔥</span> {onlineCount}명 참여중
      </div>
    </header>
  )
}

function ChatBubble({
  avatar,
  name,
  badge,
  children,
}: {
  avatar: string
  name: string
  badge: { label: string; variant: "local" | "visitor" }
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div
        className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg shrink-0"
        aria-hidden="true"
      >
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-gray-900">{name}</span>
          <span
            className={`text-xs px-1.5 py-0.5 rounded font-medium ${
              badge.variant === "local"
                ? "text-blue-500"
                : "text-orange-500"
            }`}
          >
            {badge.label}
          </span>
        </div>
        <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] text-sm text-gray-800 leading-relaxed inline-block max-w-[85%]">
          {children}
        </div>
      </div>
    </div>
  )
}

function ChatFeed({ messages }: { messages: ChatMessage[] }) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-gray-50/80">
      {messages.length === 0 && (
        <p className="text-center text-gray-400 text-sm pt-10">
          아직 메시지가 없어요. 첫 메시지를 보내보세요!
        </p>
      )}
      {messages.map((msg) => (
        <ChatBubble
          key={msg.id}
          avatar={msg.avatar}
          name={msg.name}
          badge={msg.badge}
        >
          {msg.content}
        </ChatBubble>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

function ChatInput({ onSend }: { onSend: (content: string) => void }) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    const content = message.trim()
    if (!content) return
    onSend(content)
    setMessage("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  return (
    <div className="bg-white border-t border-gray-100 px-3 py-2 flex items-end gap-2">
      <button
        className="shrink-0 w-10 h-10 flex items-center justify-center text-gray-400 active:text-gray-600 transition-colors"
        aria-label="이미지 첨부"
      >
        <ImagePlus className="w-5 h-5" />
      </button>
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
        placeholder="메시지를 입력하세요..."
        rows={1}
        className="flex-1 resize-none rounded-2xl bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 max-h-24"
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement
          target.style.height = "auto"
          target.style.height = `${Math.min(target.scrollHeight, 96)}px`
        }}
      />
      <button
        onClick={handleSend}
        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          message.trim()
            ? "bg-blue-500 text-white active:bg-blue-600"
            : "bg-gray-100 text-gray-300"
        }`}
        disabled={!message.trim()}
        aria-label="메시지 전송"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  )
}

export function HomeView() {
  const { messages, onlineCount, sendMessage } = useChat()

  return (
    <>
      <HomeHeader onlineCount={onlineCount} />
      <ChatFeed messages={messages} />
      <ChatInput onSend={sendMessage} />
    </>
  )
}
