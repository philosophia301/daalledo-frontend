import { MessageCircle, Map, Bell } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type TabType = "home" | "explore" | "activity"

export interface TabConfig {
  id: TabType
  label: string
  icon: LucideIcon
}

export const TABS: TabConfig[] = [
  { id: "home", label: "홈", icon: MessageCircle },
  { id: "explore", label: "탐색", icon: Map },
  { id: "activity", label: "알림", icon: Bell },
]
