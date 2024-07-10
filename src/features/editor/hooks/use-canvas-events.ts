import { useEffect } from "react"

import { fabric } from "fabric"

interface useCanvasEventsProps {
  canvas: fabric.Canvas | null
  setSelectedObjects: (object: fabric.Object[]) => void
  clearSelectionCallback?: () => void
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: useCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        console.log("selection:created")
        setSelectedObjects(e.selected || [])
      })
      canvas.on("selection:updated", (e) => {
        console.log("selection:updated")
        setSelectedObjects(e.selected || [])
      })
      canvas.on("selection:cleared", () => {
        console.log("selection:cleared")
        setSelectedObjects([])
        clearSelectionCallback?.()
      })
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created")
        canvas.off("selection:updated")
        canvas.off("selection:cleared")
      }
    }
  }, [canvas, clearSelectionCallback, setSelectedObjects])
}
