"use client"
import { Slider } from "@/components/ui/slider"

interface TimelineProps {
  selectedAction: number | null
  onSelectAction: (index: number) => void
}

export function Timeline({ selectedAction, onSelectAction }: TimelineProps) {
  const actions = [
    { type: "navigation", label: "Navigate to /login", time: "0.0s", duration: 320 },
    { type: "action", label: "Fill email input", time: "0.3s", duration: 120 },
    { type: "action", label: "Fill password input", time: "0.5s", duration: 110 },
    { type: "action", label: "Click login button", time: "0.6s", duration: 90 },
    { type: "navigation", label: "Navigate to /dashboard", time: "0.7s", duration: 280 },
    { type: "action", label: "Click profile button", time: "1.0s", duration: 100 },
  ]

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-sm font-medium">Timeline</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">1.3s</div>
      </div>

      <div className="relative h-8">
        <div className="absolute inset-0 flex items-center">
          {actions.map((action, index) => (
            <div
              key={index}
              className={`h-4 ${
                action.type === "navigation" ? "bg-blue-500" : "bg-green-500"
              } ${index === 0 ? "rounded-l" : ""} ${index === actions.length - 1 ? "rounded-r" : ""}`}
              style={{
                width: `${(action.duration / 1000) * 100}%`,
                cursor: "pointer",
              }}
              onClick={() => onSelectAction(index)}
            />
          ))}
        </div>

        {selectedAction !== null && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
            style={{
              left: `${
                actions.slice(0, selectedAction).reduce((acc, curr) => acc + curr.duration, 0) / 10 +
                actions[selectedAction].duration / 20
              }px`,
            }}
          />
        )}

        <div className="absolute bottom-0 left-0 right-0">
          <Slider defaultValue={[50]} max={100} step={1} className="h-1" />
        </div>
      </div>
    </div>
  )
}
