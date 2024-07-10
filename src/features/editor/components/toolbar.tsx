"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Hint } from "@/components/ui/hint"
import { ActiveTool, Editor } from "@/features/editor/types"
import { cn } from "@/lib/utils"

interface ToolbarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) => {
  const fillColor = editor?.getActiveFillColor()
  const strokeColor = editor?.getActiveStrokeColor()

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2" />
    )
  }

  return (
    <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2">
      <div className="flex h-full items-center justify-center">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            size="icon"
            variant="ghost"
            className={cn(activeTool === "fill" && "bg-gray-100")}
            onClick={() => onChangeActiveTool("fill")}
          >
            <div
              className="size-4 rounded-sm border"
              style={{ backgroundColor: fillColor }}
            />
          </Button>
        </Hint>
      </div>
      <div className="flex h-full items-center justify-center">
        <Hint label="Stroke color" side="bottom" sideOffset={5}>
          <Button
            size="icon"
            variant="ghost"
            className={cn(activeTool === "stroke-color" && "bg-gray-100")}
            onClick={() => onChangeActiveTool("stroke-color")}
          >
            <div
              className="size-4 rounded-sm border-2 bg-white"
              style={{ borderColor: strokeColor }}
            />
          </Button>
        </Hint>
      </div>
    </div>
  )
}
