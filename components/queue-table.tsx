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
      <table className="w-full text-left">
        <thead>
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
                    handleInputChange(queue.id, "showAgents", e.target.checked)
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
  );
}
