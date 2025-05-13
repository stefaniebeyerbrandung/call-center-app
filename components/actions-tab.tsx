"use client"

interface ActionsTabProps {
  selectedAction: number | null
  onSelectAction: (index: number) => void
}

export function ActionsTab({ selectedAction, onSelectAction }: ActionsTabProps) {
  const actions = [
    {
      type: "navigation",
      label: "Navigate to /login",
      time: "0.0s",
      duration: "320ms",
      code: "await page.goto('https://example.com/login')",
    },
    {
      type: "action",
      label: "Fill email input",
      time: "0.3s",
      duration: "120ms",
      code: "await page.getByLabel('Email').fill('user@example.com')",
    },
    {
      type: "action",
      label: "Fill password input",
      time: "0.5s",
      duration: "110ms",
      code: "await page.getByLabel('Password').fill('password123')",
    },
    {
      type: "action",
      label: "Click login button",
      time: "0.6s",
      duration: "90ms",
      code: "await page.getByRole('button', { name: 'Login' }).click()",
    },
    {
      type: "navigation",
      label: "Navigate to /dashboard",
      time: "0.7s",
      duration: "280ms",
      code: "// Automatic navigation after login",
    },
    {
      type: "action",
      label: "Click profile button",
      time: "1.0s",
      duration: "100ms",
      code: "await page.getByRole('button', { name: 'Profile' }).click()",
    },
  ]

  return (
    <div className="p-0">
      {actions.map((action, index) => (
        <div
          key={index}
          className={`flex items-start p-3 border-b border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 ${
            selectedAction === index ? "bg-gray-100 dark:bg-gray-800" : ""
          }`}
          onClick={() => onSelectAction(index)}
        >
          <div className="w-16 text-xs text-gray-500 dark:text-gray-400 pt-1">{action.time}</div>
          <div className="flex-1">
            <div className="font-medium">{action.label}</div>
            <div className="text-xs font-mono mt-1 text-gray-600 dark:text-gray-300">{action.code}</div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 pt-1 w-16 text-right">{action.duration}</div>
        </div>
      ))}
    </div>
  )
}
