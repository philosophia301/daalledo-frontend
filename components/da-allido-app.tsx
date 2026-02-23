"use client"

import { useState } from "react"
import { HomeView } from "@/components/home-view"
import { ExploreView } from "@/components/explore-view"
import { ActivityView } from "@/components/activity-view"
import { BottomTabBar } from "@/components/bottom-tab-bar"
import type { TabType } from "@/lib/config"

export function DaAllidoApp() {
  const [activeTab, setActiveTab] = useState<TabType>("home")

  return (
    <div className="mx-auto max-w-lg h-dvh relative flex flex-col overflow-hidden bg-gray-50 text-gray-900">
      {activeTab === "home" && <HomeView />}
      {activeTab === "explore" && <ExploreView />}
      {activeTab === "activity" && <ActivityView />}

      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
