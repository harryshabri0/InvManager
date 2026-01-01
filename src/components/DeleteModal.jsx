import { AlertTriangle } from 'lucide-react'

export default function DeleteModal({ isOpen, onClose, item, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[110] p-4">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm animate-in fade-in zoom-in duration-300 overflow-hidden">
        <div className="p-8 text-center">
          {/* Animated Warning Icon */}
          <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <AlertTriangle size={32} />
          </div>
          
          <h3 className="text-xl font-black text-slate-800 mb-2">Hapus Barang?</h3>
          <p className="text-slate-500 text-sm leading-relaxed px-2">
            Apakah kamu yakin ingin menghapus <span className="font-bold text-slate-800">"{item?.name}"</span>? 
            Data akan hilang dari database secara permanen.
          </p>
        </div>

        <div className="flex border-t border-slate-100">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-5 text-slate-500 font-bold hover:bg-slate-50 transition-all border-r border-slate-100"
          >
            Batal
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-6 py-5 text-red-600 font-extrabold hover:bg-red-50 transition-all"
          >
            Ya, Hapus!
          </button>
        </div>
      </div>
    </div>
  )
}