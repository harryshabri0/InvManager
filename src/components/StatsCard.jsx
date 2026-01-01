import { Search, AlertTriangle } from 'lucide-react'

export default function StatsCard({ totalItems, lowStockCount, searchQuery, setSearchQuery }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total SKU</p>
        <h3 className="text-3xl font-black">{totalItems}</h3>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <p className="text-xs font-bold text-orange-400 uppercase mb-1">Low Stock</p>
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-black text-orange-600">{lowStockCount}</h3>
          <AlertTriangle className="text-orange-500" size={20} />
        </div>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari nama barang..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
      </div>
    </div>
  )
}