"use client"

import { useState } from "react"
import { ChevronUp } from "lucide-react"
import { Header } from "@/components/header"
import { QueueTable } from "@/components/queue-table"
import { AgentTable } from "@/components/agent-table"

export default function Dashboard() {
  const [queueCollapsed, setQueueCollapsed] = useState(false)
  const [agentCollapsed, setAgentCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-200">
      <Header />

      <main className="container mx-auto p-0">
        <div className="bg-[#8B2332] text-white p-4 text-3xl font-bold">Dashboard</div>

        <div className="mb-4 border border-gray-400">
          <div className="bg-gray-300 p-2 flex justify-between items-center border-b border-gray-400">
            <div className="flex-1 font-bold">Queues</div>
            <div className="flex-1 font-bold text-center">Current</div>
            <div className="flex-1 font-bold text-center">Location</div>
            <div className="flex-1 font-bold text-right">Agents</div>
            <button className="ml-2" onClick={() => setQueueCollapsed(!queueCollapsed)}>
              <ChevronUp className={`h-5 w-5 ${queueCollapsed ? "rotate-180" : ""}`} />
            </button>
          </div>

          {!queueCollapsed && <QueueTable />}
        </div>

        <div className="border border-gray-400">
          <div className="bg-gray-300 p-2 flex justify-between items-center border-b border-gray-400">
            <div className="flex-1 font-bold">Agents</div>
            <div className="flex-1 font-bold text-center">Memberships</div>
            <div className="flex-1 font-bold text-center">Current</div>
            <div className="flex-1 font-bold text-right">Agents</div>
            <button className="ml-2" onClick={() => setAgentCollapsed(!agentCollapsed)}>
              <ChevronUp className={`h-5 w-5 ${agentCollapsed ? "rotate-180" : ""}`} />
            </button>
          </div>

          {!agentCollapsed && <AgentTable />}
        </div>
      </main>
    </div>
  )
}
