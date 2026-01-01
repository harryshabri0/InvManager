import { create } from 'zustand'
import { db } from '../firebase'
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  query,
  orderBy 
} from 'firebase/firestore'

export const useInventoryStore = create((set) => ({
  products: [],
  loading: true,

  // Mengambil data secara Real-time
  fetchProducts: () => {
    set({ loading: true });
    const colRef = collection(db, 'products');
    const q = query(colRef, orderBy('createdAt', 'desc'));

    // onSnapshot akan terpanggil setiap kali ada perubahan di Firebase
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      set({ products: items, loading: false });
    });

    return unsubscribe;
  },

  // Tambah Barang
  addProduct: async (product) => {
    try {
      await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  },

  // Update Barang
  updateProduct: async (id, updatedData) => {
    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, updatedData);
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  },

  // Hapus Barang
  deleteProduct: async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  }
}))