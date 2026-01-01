import { useState, useEffect } from 'react'
import { useInventoryStore } from './store/inventoryStore'
import { Plus, Download, Search, Filter } from 'lucide-react'

// Import Komponen Terpisah
import Sidebar from './components/Sidebar'
import InventoryTable from './components/InventoryTable'
import ProductModal from './components/ProductModal'
import DeleteModal from './components/DeleteModal'
import InventoryChart from './components/InventoryChart'
import StatsCard from './components/StatsCard'

export default function App() {
  const { products, loading, fetchProducts, addProduct, deleteProduct, updateProduct } = useInventoryStore()
  
  // --- STATE NAVIGASI ---
  const [view, setView] = useState('dashboard') 

  // --- STATE UI & MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)

  // --- STATE FILTER & FORM ---
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [formData, setFormData] = useState({ name: '', category: '', stock: '', price: '' })

  // Ambil data dari Firebase saat aplikasi dijalankan
  useEffect(() => {
    const unsubscribe = fetchProducts()
    return () => unsubscribe()
  }, [])

  // --- LOGIC: FILTERING (SEARCH & CATEGORY) ---
  const categories = ['All', ...new Set(products.map(p => p.category))]
  
  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory
    return matchSearch && matchCategory
  })

  // --- LOGIC: EXPORT KE CSV ---
  const exportToCSV = () => {
    if (products.length === 0) return alert("Data kosong!")
    const headers = ["ID,Nama,Kategori,Stok,Harga\n"]
    const rows = products.map(p => `${p.id},${p.name},${p.category},${p.stock},${p.price}\n`)
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Laporan_Stok_${new Date().toLocaleDateString()}.csv`
    a.click()
  }

  // --- ACTION HANDLERS ---
  const handleOpenAdd = () => {
    setEditId(null)
    setFormData({ name: '', category: '', stock: '', price: '' })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (item) => {
    setEditId(item.id)
    setFormData(item)
    setIsModalOpen(true)
  }

  const handleFormSubmit = async (data) => {
    if (editId) await updateProduct(editId, data)
    else await addProduct(data)
    setIsModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await deleteProduct(itemToDelete.id)
      setIsDeleteModalOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 overflow-hidden">
      
      {/* 1. SIDEBAR */}
      <Sidebar activeView={view} setView={setView} />

      {/* 2. AREA KONTEN UTAMA */}
      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* TAMPILAN DASHBOARD */}
          {view === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <header className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-500 font-medium">Analitik stok dan kategori secara real-time.</p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                <div className="lg:col-span-2">
                  <StatsCard 
                    totalItems={products.length} 
                    lowStockCount={products.filter(p => p.stock < 10).length}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                </div>
                {/* Visualisasi Recharts */}
                <InventoryChart data={products} />
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Baru Saja Ditambahkan</h2>
                <button onClick={() => setView('inventory')} className="text-blue-600 font-bold text-sm hover:underline">Lihat Semua →</button>
              </div>
              <InventoryTable 
                products={products.slice(0, 5)} 
                loading={loading} 
                onEdit={handleOpenEdit} 
                onDelete={(item) => { setItemToDelete(item); setIsDeleteModalOpen(true); }} 
              />
            </div>
          )}

          {/* TAMPILAN INVENTORY (FULL MANAGEMENT) */}
          {view === 'inventory' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inventory List</h1>
                  <p className="text-slate-500 font-medium">Kelola seluruh stok dan operasional database.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={exportToCSV} className="bg-white border-2 border-slate-100 px-5 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-slate-50 transition-all shadow-sm">
                    <Download size={18} /> Export CSV
                  </button>
                  <button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-xl shadow-blue-100 font-bold transition-all active:scale-95">
                    <Plus size={20} /> Add Product
                  </button>
                </div>
              </header>

              {/* TOOLBAR: Search & Filter Kategori */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="Cari barang..." 
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  <select 
                    className="pl-10 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-600 appearance-none cursor-pointer min-w-[160px]"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <InventoryTable 
                products={filteredProducts} 
                loading={loading} 
                onEdit={handleOpenEdit} 
                onDelete={(item) => { setItemToDelete(item); setIsDeleteModalOpen(true); }} 
              />
            </div>
          )}

        </div>
      </main>

      {/* --- MODALS --- */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editId={editId}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleFormSubmit}
      />

      <DeleteModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        item={itemToDelete}
        onConfirm={handleConfirmDelete}
      />

    </div>
  )
}