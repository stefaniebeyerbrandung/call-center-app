"use client";

import { useState } from "react";

export function Header() {
  const [system, setSystem] = useState("User251");
  return (
    <header className="bg-white p-4 flex justify-between items-center container mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Berliner Hilfetelefon für Frauen</h1>
        <h2 className="text-4xl font-bold">Call Center</h2>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4 w-full">
          <a href="#" className="text-blue-600 underline">
            Full Screen
          </a>
          <a href="#" className="text-blue-600 underline">
            Close
          </a>
        </div>
        <div className="text-right flex gap-2">
          <div>System:</div>
          <input
            type="text"
            placeholder="User251"
            className=""
            value={system}
            onChange={(e) => setSystem(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
