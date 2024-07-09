"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { fabric } from "fabric"

import { Navbar } from "@/features/editor/components/navbar"
import { ShapeSidebar } from "@/features/editor/components/shape-sidebar"
import { Sidebar } from "@/features/editor/components/sidebar"
import { Toolbar } from "@/features/editor/components/toolbar"
import { useEditor } from "@/features/editor/hooks/use-editor"
import { ActiveTool } from "@/features/editor/types"

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select")

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool("select")
      }

      if (tool === "draw") {
        //TODO
      }

      if (activeTool === "draw") {
        //TODO
      }

      setActiveTool(tool)
    },
    [activeTool],
  )
  const { init, editor } = useEditor()

  const canvasRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    })

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    })

    return () => {
      canvas.dispose()
    }
  }, [init])

  return (
    <div className="flex h-full flex-col">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className="relative flex flex-1 flex-col overflow-auto bg-muted">
          <Toolbar />
          <div className="h-full flex-1 bg-muted" ref={containerRef}>
            <canvas ref={canvasRef} />
          </div>
        </main>
      </div>
    </div>
  )
}
