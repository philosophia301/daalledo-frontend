"use client"

import { TABS, type TabType } from "@/lib/config"

export function BottomTabBar({
  activeTab,
  onTabChange,
}: {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}) {
  return (
    <nav
      className="bg-white border-t border-gray-100 flex justify-around p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-20"
      aria-label="메인 네비게이션"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? "text-blue-500" : "text-gray-400"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
