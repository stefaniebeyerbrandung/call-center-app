"use client";

import { useState } from "react";

export function AgentTable() {
  const [agentData, setAgentData] = useState([
    {
      id: 1,
      status: "busy",
      name: "Name",
      queues: "3",
      signInTime: "16:23:46",
      duration: "01:01:30",
      callState: "Idle",
      agentState: "Wrap-up (14:29)",
      percentAvailable: "76%",
      avgBusyIn: "00:00",
      avgBusyOut: "00:00",
      avgWrapUp: "00:00",
    },
    {
      id: 2,
      status: "busy",
      name: "Name",
      queues: "3",
      signInTime: "17:15:02",
      duration: "10:14",
      callState: "Idle",
      agentState: "Wrap-up (00:58)",
      percentAvailable: "80%",
      avgBusyIn: "00:58",
      avgBusyOut: "00:00",
      avgWrapUp: "01:00",
    },
    {
      id: 3,
      status: "busy",
      name: "Name",
      queues: "3",
      signInTime: "16:29:18",
      duration: "55:58",
      callState: "Idle",
      agentState: "Wrap-up (13:00)",
      percentAvailable: "58%",
      avgBusyIn: "00:00",
      avgBusyOut: "00:00",
      avgWrapUp: "00:00",
    },
  ]);

  const handleInputChange = (id: number, field: string, value: string) => {
    setAgentData((prevData) =>
      prevData.map((agent) =>
        agent.id === id ? { ...agent, [field]: value } : agent
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-300 border-t border-b border-gray-400">
            <th className="p-2 border-r border-gray-400 cursor-pointer hover:bg-gray-400">
              Status
            </th>
            <th className="p-2 border-r border-gray-400">Name</th>
            <th className="p-2 border-r border-gray-400">Queues(Total)</th>
            <th className="p-2 border-r border-gray-400">Sign-in Time</th>
            <th className="p-2 border-r border-gray-400">Duration</th>
            <th className="p-2 border-r border-gray-400">Call State</th>
            <th className="p-2 border-r border-gray-400">Agent State</th>
            <th className="p-2 border-r border-gray-400">% Available</th>
            <th className="p-2 border-r border-gray-400">Avg Busy In</th>
            <th className="p-2 border-r border-gray-400">Avg Busy Out</th>
            <th className="p-2">Avg Wrap-up</th>
          </tr>
        </thead>
        <tbody>
          {agentData.map((agent, index) => (
            <tr
              key={agent.id}
              className={`${
                index % 2 === 0 ? "bg-[#B8D1E5]" : "bg-[#9BBDD9]"
              } border-b border-gray-400 hover:bg-blue-300`}
            >
              <td className="p-2 border-r border-gray-400">
                <div className="w-6 h-6 rounded-full bg-[#8B2332]"></div>
              </td>
              <td className="p-2 border-r border-gray-400 text-blue-700 underline cursor-pointer hover:text-blue-900">
                <input
                  type="text"
                  value={agent.name}
                  onChange={(e) =>
                    handleInputChange(agent.id, "name", e.target.value)
                  }
                  className="w-full bg-transparent text-blue-700 underline cursor-pointer hover:text-blue-900 focus:outline-none"
                />
              </td>
              <td className="p-2 border-r border-gray-400 text-blue-700 underline cursor-pointer hover:text-blue-900">
                <input
                  type="text"
                  value={agent.queues}
                  onChange={(e) =>
                    handleInputChange(agent.id, "queues", e.target.value)
                  }
                  className="w-full bg-transparent text-blue-700 underline cursor-pointer hover:text-blue-900 focus:outline-none"
                />
              </td>
              <td className="p-2 border-r border-gray-400">
                <input
                  type="text"
                  value={agent.signInTime}
                  onChange={(e) =>
                    handleInputChange(agent.id, "signInTime", e.target.value)
                  }
                  className="w-full bg-transparent focus:outline-none"
                />
              </td>
              <td className="p-2 border-r border-gray-400">
                <input
                  type="text"
                  value={agent.duration}
                  onChange={(e) =>
                    handleInputChange(agent.id, "duration", e.target.value)
                  }
                  className="w-full bg-transparent focus:outline-none"
                />
              </td>
              <td className="p-2 border-r border-gray-400">
                <input
                  type="text"
                  value={agent.callState}
                  onChange={(e) =>
                    handleInputChange(agent.id, "callState", e.target.value)
                  }
                  className="w-full bg-transparent focus:outline-none"
                />
              </td>
              <td className="p-2 border-r border-gray-400">
                <input
                  type="text"
                  value={agent.agentState}
                  onChange={(e) =>
                    handleInputChange(agent.id, "agentState", e.target.value)
                  }
                  className="w-full bg-transparent focus:outline-none"
                />
              </td>
              <td className="p-2 border-r border-gray-400">
                <input
                  type="text"
                  value={agent.percentAvailable}
                  onChange={(e) =>
                    handleInputChange(
                      agent.id,
                      "percentAvailable",
                      e.target.value
                    )
                  }
                  className="w-full bg-transparent focus:outline-none"
                />
              </td>
              <td className="p-2 border-r border-gray-400">
                <input
                  type="text"
                  value={agent.avgBusyIn}
                  onChange={(e) =>
                    handleInputChange(agent.id, "avgBusyIn", e.target.value)
                  }
                  className="w-full bg-transparent focus:outline-none"
                />
              </td>
              <td className="p-2 border-r border-gray-400">
                <input
                  type="text"
                  value={agent.avgBusyOut}
                  onChange={(e) =>
                    handleInputChange(agent.id, "avgBusyOut", e.target.value)
                  }
                  className="w-full bg-transparent focus:outline-none"
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={agent.avgWrapUp}
                  onChange={(e) =>
                    handleInputChange(agent.id, "avgWrapUp", e.target.value)
                  }
                  className="w-full bg-transparent focus:outline-none"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
