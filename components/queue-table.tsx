"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export function QueueTable() {
  const [queueData, setQueueData] = useState([
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
    {
      id: 4,
      name: "Name",
      status: "2/15",
      callInQueue: "00:12",
      waiting: "00:45",
      ewt: "01:30",
      aht: "00:10",
      asa: "2/3",
      staffed: "2",
      idle: "1",
      unavailable: "0",
      showAgents: true,
    },
    {
      id: 5,
      name: "Name",
      status: "3/8",
      callInQueue: "00:18",
      waiting: "00:22",
      ewt: "00:50",
      aht: "00:15",
      asa: "1/3",
      staffed: "3",
      idle: "0",
      unavailable: "1",
      showAgents: false,
    },
    {
      id: 6,
      name: "Name",
      status: "0/12",
      callInQueue: "00:00",
      waiting: "00:10",
      ewt: "00:30",
      aht: "00:08",
      asa: "3/3",
      staffed: "4",
      idle: "2",
      unavailable: "0",
      showAgents: true,
    },
  ]);

  const handleInputChange = (
    id: number,
    field: string,
    value: string | boolean
  ) => {
    setQueueData((prevData) =>
      prevData.map((queue) =>
        queue.id === id ? { ...queue, [field]: value } : queue
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
                Name
              </th>
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
                className={`${
                  index % 2 === 0 ? "bg-[#B8D1E5]" : "bg-[#9BBDD9]"
                } border-b border-gray-400 hover:bg-blue-300`}
              >
                <td className="p-2 border-r border-gray-400 text-blue-700 underline cursor-pointer hover:text-blue-900">
                  <input
                    type="text"
                    value={queue.name}
                    onChange={(e) =>
                      handleInputChange(queue.id, "name", e.target.value)
                    }
                    className="w-full bg-transparent text-blue-700 underline cursor-pointer hover:text-blue-900 focus:outline-none"
                  />
                </td>
                <td className="p-2 border-r border-gray-400">
                  <input
                    type="text"
                    value={queue.status}
                    onChange={(e) =>
                      handleInputChange(queue.id, "status", e.target.value)
                    }
                    className="w-full bg-transparent focus:outline-none"
                  />
                </td>
                <td className="p-2 border-r border-gray-400">
                  <input
                    type="text"
                    value={queue.callInQueue}
                    onChange={(e) =>
                      handleInputChange(queue.id, "callInQueue", e.target.value)
                    }
                    className="w-full bg-transparent focus:outline-none"
                  />
                </td>
                <td className="p-2 border-r border-gray-400">
                  <input
                    type="text"
                    value={queue.waiting}
                    onChange={(e) =>
                      handleInputChange(queue.id, "waiting", e.target.value)
                    }
                    className="w-full bg-transparent focus:outline-none"
                  />
                </td>
                <td className="p-2 border-r border-gray-400">
                  <input
                    type="text"
                    value={queue.ewt}
                    onChange={(e) =>
                      handleInputChange(queue.id, "ewt", e.target.value)
                    }
                    className="w-full bg-transparent focus:outline-none"
                  />
                </td>
                <td className="p-2 border-r border-gray-400">
                  <input
                    type="text"
                    value={queue.aht}
                    onChange={(e) =>
                      handleInputChange(queue.id, "aht", e.target.value)
                    }
                    className="w-full bg-transparent focus:outline-none"
                  />
                </td>
                <td className="p-2 border-r border-gray-400">
                  <input
                    type="text"
                    value={queue.asa}
                    onChange={(e) =>
                      handleInputChange(queue.id, "asa", e.target.value)
                    }
                    className="w-full bg-transparent focus:outline-none"
                  />
                </td>
                <td className="p-2 border-r border-gray-400">
                  <input
                    type="text"
                    value={queue.staffed}
                    onChange={(e) =>
                      handleInputChange(queue.id, "staffed", e.target.value)
                    }
                    className="w-full bg-transparent focus:outline-none"
                  />
                </td>
                <td className="p-2 border-r border-gray-400">
                  <input
                    type="text"
                    value={queue.idle}
                    onChange={(e) =>
                      handleInputChange(queue.id, "idle", e.target.value)
                    }
                    className="w-full bg-transparent focus:outline-none"
                  />
                </td>
                <td className="p-2 border-r border-gray-400">
                  <input
                    type="text"
                    value={queue.unavailable}
                    onChange={(e) =>
                      handleInputChange(queue.id, "unavailable", e.target.value)
                    }
                    className="w-full bg-transparent focus:outline-none"
                  />
                </td>
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={queue.showAgents}
                    onChange={(e) =>
                      handleInputChange(
                        queue.id,
                        "showAgents",
                        e.target.checked
                      )
                    }
                    className="hidden"
                    id={`show-agents-${queue.id}`}
                  />
                  <label
                    htmlFor={`show-agents-${queue.id}`}
                    className="cursor-pointer"
                  >
                    <Check className="inline-block h-5 w-5" />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
