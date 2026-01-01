import { Boxes, LayoutDashboard, Package } from 'lucide-react'

export default function Sidebar({ activeView, setView }) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-6 hidden lg:block h-screen sticky top-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg">
          <Boxes size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">InvManager</span>
      </div>

      <nav className="space-y-2">
        {/* Tombol Dashboard */}
        <button 
          onClick={() => setView('dashboard')} // Memberi tahu App.jsx untuk ganti view
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
            activeView === 'dashboard' 
            ? 'bg-blue-50 text-blue-700' // Warna kalau aktif
            : 'text-slate-500 hover:bg-slate-50' // Warna kalau tidak aktif
          }`}
        >
          <LayoutDashboard size={20} /> Dashboard
        </button>

        {/* Tombol Inventory */}
        <button 
          onClick={() => setView('inventory')} // Memberi tahu App.jsx untuk ganti view
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
            activeView === 'inventory' 
            ? 'bg-blue-50 text-blue-700' 
            : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Package size={20} /> Inventory
        </button>
      </nav>
    </aside>
  )
}