export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Nodes</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-gray-500 text-sm">Total nodes</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Apps</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-gray-500 text-sm">Deployed apps</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Jobs</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-gray-500 text-sm">Active jobs</p>
        </div>
      </div>
    </div>
  );
}
