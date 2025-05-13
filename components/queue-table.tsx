"use client"

import { useState } from "react"
import { Check } from "lucide-react"

export function QueueTable() {
  const [queueData] = useState([
    {
      id: 1,
      name: "Name",
      status: "0/20",
      callInQueue: "00:25",
      waiting: "00:00",
      ewt: "01:00",
      aht: "00:00",
      asa: "3/3",
      staffed: "0",
      idle: "0",
      unavailable: "0",
      showAgents: true,
    },
    {
      id: 2,
      name: "Name",
      status: "1/10",
      callInQueue: "00:00",
      waiting: "00:38",
      ewt: "01:55",
      aht: "00:05",
      asa: "3/3",
      staffed: "0",
      idle: "0",
      unavailable: "0",
      showAgents: true,
    },
    {
      id: 3,
      name: "Name",
      status: "1/10",
      callInQueue: "00:06",
      waiting: "00:00",
      ewt: "00:00",
      aht: "00:00",
      asa: "3/3",
      staffed: "0",
      idle: "0",
      unavailable: "0",
      showAgents: true,
    },
  ])

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-300 border-t border-b border-gray-400">
            <th className="p-2 border-r border-gray-400 cursor-pointer hover:bg-gray-400">Name</th>
            <th className="p-2 border-r border-gray-400">Status</th>
            <th className="p-2 border-r border-gray-400">Call in Queue</th>
            <th className="p-2 border-r border-gray-400">Waiting</th>
            <th className="p-2 border-r border-gray-400">EWT</th>
            <th className="p-2 border-r border-gray-400">AHT</th>
            <th className="p-2 border-r border-gray-400">ASA</th>
            <th className="p-2 border-r border-gray-400">Staffed</th>
            <th className="p-2 border-r border-gray-400">Idle</th>
            <th className="p-2 border-r border-gray-400">Unavailable</th>
            <th className="p-2">Show Agents</th>
          </tr>
        </thead>
        <tbody>
          {queueData.map((queue, index) => (
            <tr
              key={queue.id}
              className={`${index % 2 === 0 ? "bg-[#B8D1E5]" : "bg-[#9BBDD9]"} border-b border-gray-400 hover:bg-blue-300`}
            >
              <td className="p-2 border-r border-gray-400 text-blue-700 underline cursor-pointer hover:text-blue-900">
                {queue.name}
              </td>
              <td className="p-2 border-r border-gray-400">{queue.status}</td>
              <td className="p-2 border-r border-gray-400">{queue.callInQueue}</td>
              <td className="p-2 border-r border-gray-400">{queue.waiting}</td>
              <td className="p-2 border-r border-gray-400">{queue.ewt}</td>
              <td className="p-2 border-r border-gray-400">{queue.aht}</td>
              <td className="p-2 border-r border-gray-400">{queue.asa}</td>
              <td className="p-2 border-r border-gray-400">{queue.staffed}</td>
              <td className="p-2 border-r border-gray-400">{queue.idle}</td>
              <td className="p-2 border-r border-gray-400">{queue.unavailable}</td>
              <td className="p-2 text-center">
                <Check className="inline-block h-5 w-5" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-2 bg-white border-t border-gray-400">
        <input
          type="text"
          className="border border-gray-300 p-1 w-full"
          placeholder="Under title area should be all typable"
        />
      </div>
    </div>
  )
}
