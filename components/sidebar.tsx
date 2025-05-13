"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Play, Eye, ChevronDown, ChevronRight, CheckCircle2, XCircle, SkipForward } from "lucide-react"

interface SidebarProps {
  selectedTest: string | null
  onSelectTest: (test: string) => void
}

export function Sidebar({ selectedTest, onSelectTest }: SidebarProps) {
  const [filter, setFilter] = useState("")
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    tests: true,
  })

  const toggleFolder = (folder: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }))
  }

  const testFiles = [
    {
      name: "example.spec.ts",
      status: "passed",
      tests: [
        { name: "should navigate to homepage", status: "passed" },
        { name: "should display welcome message", status: "passed" },
        { name: "should have working links", status: "passed" },
      ],
    },
    {
      name: "login.spec.ts",
      status: "failed",
      tests: [
        { name: "should show login form", status: "passed" },
        { name: "should validate email", status: "failed" },
        { name: "should login successfully", status: "skipped" },
      ],
    },
    {
      name: "profile.spec.ts",
      status: "passed",
      tests: [
        { name: "should show user profile", status: "passed" },
        { name: "should allow editing profile", status: "passed" },
      ],
    },
  ]

  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <Button size="sm" variant="outline" className="flex items-center gap-1 h-8">
            <Play size={14} />
            <span>Run all</span>
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1 h-8">
            <Eye size={14} />
            <span>Watch all</span>
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Filter tests..."
            className="pl-9"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="tests" className="px-2 pt-2">
        <TabsList className="w-full">
          <TabsTrigger value="tests" className="flex-1">
            Tests
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex-1">
            Projects
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="overflow-y-auto flex-1 py-2">
        <div className="px-2">
          <div
            className="flex items-center gap-1 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            onClick={() => toggleFolder("tests")}
          >
            {expandedFolders["tests"] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span className="font-medium">tests</span>
            <Button size="icon" variant="ghost" className="h-5 w-5 ml-auto">
              <Play size={14} />
            </Button>
            <Button size="icon" variant="ghost" className="h-5 w-5">
              <Eye size={14} />
            </Button>
          </div>

          {expandedFolders["tests"] &&
            testFiles.map((file) => (
              <div key={file.name} className="ml-4">
                <div
                  className={`flex items-center gap-1 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${
                    selectedTest === file.name ? "bg-gray-100 dark:bg-gray-800" : ""
                  }`}
                  onClick={() => toggleFolder(file.name)}
                >
                  {expandedFolders[file.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  <span className="font-medium">{file.name}</span>
                  {file.status === "passed" && <CheckCircle2 size={14} className="ml-1 text-green-500" />}
                  {file.status === "failed" && <XCircle size={14} className="ml-1 text-red-500" />}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-5 w-5 ml-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectTest(file.name)
                    }}
                  >
                    <Play size={14} />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-5 w-5">
                    <Eye size={14} />
                  </Button>
                </div>

                {expandedFolders[file.name] &&
                  file.tests.map((test) => (
                    <div
                      key={test.name}
                      className="flex items-center gap-1 py-1 px-2 ml-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => onSelectTest(file.name)}
                    >
                      {test.status === "passed" && <CheckCircle2 size={14} className="text-green-500" />}
                      {test.status === "failed" && <XCircle size={14} className="text-red-500" />}
                      {test.status === "skipped" && <SkipForward size={14} className="text-gray-400" />}
                      <span>{test.name}</span>
                      <Button size="icon" variant="ghost" className="h-5 w-5 ml-auto">
                        <Play size={14} />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-5 w-5">
                        <Eye size={14} />
                      </Button>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>

      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>3 files</span>
          <span>8 tests</span>
        </div>
      </div>
    </div>
  )
}
