"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Eye,
  ExternalLink,
  Maximize2,
  Hand,
  RefreshCw,
  Code,
  FileCode,
  List,
  AlertCircle,
  Terminal,
  Globe,
  Paperclip,
  Info,
} from "lucide-react"
import { Timeline } from "@/components/timeline"
import { ActionsTab } from "@/components/actions-tab"
import { SourceTab } from "@/components/source-tab"
import { DomSnapshot } from "@/components/dom-snapshot"

interface MainPanelProps {
  selectedTest: string | null
  selectedAction: number | null
  onSelectAction: (index: number) => void
}

export function MainPanel({ selectedTest, selectedAction, onSelectAction }: MainPanelProps) {
  const [activeTab, setActiveTab] = useState("actions")

  if (!selectedTest) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <p>Select a test to see details</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">{selectedTest}</h1>
          <Button size="sm" variant="outline" className="flex items-center gap-1 h-8">
            <Play size={14} />
            <span>Run</span>
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1 h-8">
            <Eye size={14} />
            <span>Watch</span>
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1 h-8">
            <ExternalLink size={14} />
            <span>Open in browser</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-1 h-8">
            <RefreshCw size={14} />
            <span>Clear</span>
          </Button>
        </div>
      </div>

      <Timeline selectedAction={selectedAction} onSelectAction={onSelectAction} />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="px-4 pt-2 border-b border-gray-200 dark:border-gray-800 justify-start gap-1">
              <TabsTrigger value="actions" className="flex items-center gap-1">
                <List size={16} />
                <span>Actions</span>
              </TabsTrigger>
              <TabsTrigger value="source" className="flex items-center gap-1">
                <FileCode size={16} />
                <span>Source</span>
              </TabsTrigger>
              <TabsTrigger value="call" className="flex items-center gap-1">
                <Code size={16} />
                <span>Call</span>
              </TabsTrigger>
              <TabsTrigger value="log" className="flex items-center gap-1">
                <Terminal size={16} />
                <span>Log</span>
              </TabsTrigger>
              <TabsTrigger value="errors" className="flex items-center gap-1">
                <AlertCircle size={16} />
                <span>Errors</span>
              </TabsTrigger>
              <TabsTrigger value="console" className="flex items-center gap-1">
                <Terminal size={16} />
                <span>Console</span>
              </TabsTrigger>
              <TabsTrigger value="network" className="flex items-center gap-1">
                <Globe size={16} />
                <span>Network</span>
              </TabsTrigger>
              <TabsTrigger value="attachments" className="flex items-center gap-1">
                <Paperclip size={16} />
                <span>Attachments</span>
              </TabsTrigger>
              <TabsTrigger value="metadata" className="flex items-center gap-1">
                <Info size={16} />
                <span>Metadata</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="actions" className="flex-1 overflow-auto p-0 m-0">
              <ActionsTab selectedAction={selectedAction} onSelectAction={onSelectAction} />
            </TabsContent>

            <TabsContent value="source" className="flex-1 overflow-auto p-0 m-0">
              <SourceTab />
            </TabsContent>

            <TabsContent value="call" className="flex-1 overflow-auto p-4 m-0">
              <div className="text-sm">
                <h3 className="font-medium mb-2">Call Information</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-500 dark:text-gray-400">Duration:</div>
                  <div>42ms</div>
                  <div className="text-gray-500 dark:text-gray-400">Locator:</div>
                  <div>page.getByRole('button', &#123; name: 'Login' &#125;)</div>
                  <div className="text-gray-500 dark:text-gray-400">Strict:</div>
                  <div>true</div>
                  <div className="text-gray-500 dark:text-gray-400">Key:</div>
                  <div>click</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="log" className="flex-1 overflow-auto p-4 m-0">
              <pre className="text-xs font-mono whitespace-pre-wrap">
                {`[12:34:56] waiting for selector "button:has-text('Login')"
[12:34:56] waiting for element to be visible, enabled and stable
[12:34:56] scrolling into view if needed
[12:34:56] performing click action
[12:34:56] click action done
[12:34:57] waiting for navigation`}
              </pre>
            </TabsContent>

            {["errors", "console", "network", "attachments", "metadata"].map((tab) => (
              <TabsContent key={tab} value={tab} className="flex-1 overflow-auto p-4 m-0">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} content would be displayed here.
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <Separator orientation="vertical" />

        <div className="w-1/2 flex flex-col overflow-hidden">
          <div className="p-2 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="text-sm font-medium">DOM Snapshot</div>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" className="h-7 w-7">
                <Maximize2 size={14} />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-7">
                <Hand size={14} />
              </Button>
            </div>
          </div>

          <DomSnapshot />
        </div>
      </div>
    </div>
  )
}
