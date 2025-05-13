export function Header() {
  return (
    <header className="bg-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Berliner Hilfetelefon für Frauen</h1>
        <h2 className="text-4xl font-bold">Call Center</h2>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="text-blue-600 underline">
          Full Screen
        </a>
        <a href="#" className="text-blue-600 underline">
          Close
        </a>
        <div className="text-right">
          <div>System: User251</div>
          <input type="text" placeholder="Username typable" className="border border-gray-300 px-2 py-1 mt-1" />
        </div>
      </div>
    </header>
  )
}
