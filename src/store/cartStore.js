import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  totalQty: 0,
  subtotal: 0,
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  
  _calculateTotals: (items) => {
    const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    return { totalQty, subtotal };
  },

  addItem: (product) => set((state) => {
    const existing = state.items.find(i => i._id === product._id);
    let newItems;
    if (existing) {
      newItems = state.items.map(i =>
        i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newItems = [...state.items, { ...product, quantity: 1 }];
    }
    return { items: newItems, ...get()._calculateTotals(newItems) };
  }),

  removeItem: (id) => set((state) => {
    const newItems = state.items.filter(i => i._id !== id);
    return { items: newItems, ...get()._calculateTotals(newItems) };
  }),

  updateQty: (id, amount) => set((state) => {
    const newItems = state.items.map(i => {
      if (i._id === id) {
        const newQuantity = i.quantity + amount;
        return { ...i, quantity: newQuantity > 0 ? newQuantity : 0 };
      }
      return i;
    }).filter(i => i.quantity > 0);
    return { items: newItems, ...get()._calculateTotals(newItems) };
  }),

  clearCart: () => set({ items: [], totalQty: 0, subtotal: 0 })
}));

export default useCartStore;
