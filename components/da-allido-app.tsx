"use client"

import { useState } from "react"
import { HomeView } from "@/components/home-view"
import { ExploreView } from "@/components/explore-view"
import { ProfileView } from "@/components/profile-view"
import { BottomTabBar } from "@/components/bottom-tab-bar"
import { ProfileProvider } from "@/contexts/profile-context"
import type { TabType } from "@/lib/config"

export function DaAllidoApp() {
  const [activeTab, setActiveTab] = useState<TabType>("home")

  return (
    <ProfileProvider>
      <div className="mx-auto max-w-lg h-dvh relative flex flex-col overflow-hidden bg-gray-50 text-gray-900">
        {activeTab === "home" && <HomeView />}
        {activeTab === "explore" && <ExploreView />}
        {activeTab === "profile" && <ProfileView />}

        <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </ProfileProvider>
  )
}
