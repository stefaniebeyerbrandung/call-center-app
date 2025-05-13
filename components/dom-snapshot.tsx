export function DomSnapshot() {
  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-4">
        <div className="max-w-md mx-auto border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Login</h2>
          </div>
          <div className="p-4">
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value="user@example.com"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value="••••••••"
                />
              </div>
              <button
                type="button"
                className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
