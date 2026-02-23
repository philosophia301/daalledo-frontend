"use client"

import { MessageSquare, Camera } from "lucide-react"

const notifications = [
  {
    icon: MessageSquare,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    text: "내가 남긴 해운대 웨이팅 질문에 새로운 답변이 달렸어요!",
    time: "방금 전",
  },
  {
    icon: Camera,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    text: "근처(100m)에서 사진 촬영 요청이 올라왔어요! 도와주러 가볼까요?",
    time: "10분 전",
  },
]

export function ActivityView() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <h1 className="font-bold text-gray-900">🔔 내 소식</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notifications.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              className="bg-white p-4 rounded-2xl flex items-start gap-3 shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center shrink-0`}
              >
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 leading-relaxed">{item.text}</p>
                <p className="text-xs text-gray-400 mt-1.5">{item.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
