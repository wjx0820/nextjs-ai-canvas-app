import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close"
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header"
import {
  ActiveTool,
  Editor,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "@/features/editor/types"
import { cn } from "@/lib/utils"

interface StrokeWidthSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const StrokeWidthSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthSidebarProps) => {
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH
  const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY

  const onClose = () => {
    onChangeActiveTool("select")
  }

  const onChangeStrokeWidth = (value: number) => {
    editor?.changeStrokeWidth(value)
  }

  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value)
  }

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "stroke-width" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Stroke options"
        description="Modify the stroke of your element"
      />
      <ScrollArea>
        <div className="space-y-4 border-b p-4">
          <Label className="text-sm">Stroke width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onChangeStrokeWidth(values[0])}
          />
        </div>
        <div className="space-y-4 border-b p-4">
          <Label className="text-sm">Stroke type</Label>
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              "h-16 w-full justify-start px-4 py-2 text-left",
              JSON.stringify(typeValue) === `[]` && "border-2 border-blue-500",
            )}
            onClick={() => onChangeStrokeType([])}
          >
            <div className="w-full rounded-full border-4 border-black"></div>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              "h-16 w-full justify-start px-4 py-2 text-left",
              JSON.stringify(typeValue) === `[5,5]` &&
                "border-2 border-blue-500",
            )}
            onClick={() => onChangeStrokeType([5, 5])}
          >
            <div className="w-full rounded-full border-4 border-dashed border-black"></div>
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  )
}
