import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  isActive?: boolean
  onClick: () => void
}

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Button>
      <Icon />
    </Button>
  )
}
