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
    {
      id: 4,
      status: "available",
      name: "Name",
      queues: "2",
      signInTime: "15:45:22",
      duration: "01:30:15",
      callState: "Active",
      agentState: "Available",
      percentAvailable: "92%",
      avgBusyIn: "01:15",
      avgBusyOut: "00:30",
      avgWrapUp: "00:45",
    },
    {
      id: 5,
      status: "unavailable",
      name: "Name",
      queues: "4",
      signInTime: "16:10:05",
      duration: "01:05:32",
      callState: "Idle",
      agentState: "Break (10:00)",
      percentAvailable: "45%",
      avgBusyIn: "02:10",
      avgBusyOut: "00:00",
      avgWrapUp: "01:20",
    },
    {
      id: 6,
      status: "busy",
      name: "Name",
      queues: "1",
      signInTime: "17:30:00",
      duration: "00:35:27",
      callState: "Active",
      agentState: "On Call (05:12)",
      percentAvailable: "65%",
      avgBusyIn: "01:45",
      avgBusyOut: "00:50",
      avgWrapUp: "00:30",
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
      <div
        className="h-[229px] overflow-y-scroll"
        style={{
          scrollbarWidth: "auto",
          scrollbarColor: "#c0c0c0 #f0f0f0",
        }}
      >
        <style jsx global>{`
          /* Oldschool Windows Scrollbar Styling */
          ::-webkit-scrollbar {
            width: 16px;
            height: 16px;
          }

          ::-webkit-scrollbar-track {
            background: #f0f0f0;
            border: 1px solid #a9a9a9;
          }

          ::-webkit-scrollbar-thumb {
            background: #c0c0c0;
            border: 1px solid #a9a9a9;
            box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #707070;
          }

          ::-webkit-scrollbar-button {
            display: block;
            background: #c0c0c0;
            height: 16px;
            width: 16px;
            border: 1px solid #a9a9a9;
            box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #707070;
          }

          ::-webkit-scrollbar-button:vertical:start:decrement {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpolygon points='4,2.5 7,5.5 1,5.5' fill='%23000000'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
          }

          ::-webkit-scrollbar-button:vertical:end:increment {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpolygon points='4,5.5 7,2.5 1,2.5' fill='%23000000'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: center;
          }
        `}</style>
        <table className="w-full text-left">
          <thead className="sticky top-0 z-10">
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
                  <div
                    className={`w-6 h-6 rounded-full ${
                      agent.status === "busy"
                        ? "bg-[#8B2332]"
                        : agent.status === "available"
                        ? "bg-[#2E8B57]"
                        : "bg-[#FFA500]"
                    }`}
                  ></div>
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
    </div>
  );
}
