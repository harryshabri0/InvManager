import { Loader2, Pencil, Trash2 } from 'lucide-react'

export default function InventoryTable({ products, loading, onEdit, onDelete }) {
  const formatIDR = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num)

  if (loading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-medium">Sinkronisasi Firestore...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-50/50 border-b border-slate-100">
          <tr className="text-xs font-bold text-slate-400 uppercase">
            <th className="px-8 py-4">Product Name</th>
            <th className="px-8 py-4">Category</th>
            <th className="px-8 py-4">Stock</th>
            <th className="px-8 py-4">Price</th>
            <th className="px-8 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {products.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-8 py-5 font-bold text-slate-800">{item.name}</td>
              <td className="px-8 py-5"><span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase">{item.category}</span></td>
              <td className="px-8 py-5">
                <div className={`font-bold flex items-center gap-2 ${item.stock < 10 ? 'text-orange-600' : 'text-emerald-600'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${item.stock < 10 ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                  {item.stock} unit
                </div>
              </td>
              <td className="px-8 py-5 text-slate-500 font-medium">{formatIDR(item.price)}</td>
              <td className="px-8 py-5 text-right flex justify-end gap-2">
                <button onClick={() => onEdit(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Pencil size={18} /></button>
                <button onClick={() => onDelete(item)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}