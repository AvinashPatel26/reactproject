import React from 'react';
import useCartStore from './store/cartStore';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQty, removeItem, subtotal } = useCartStore();

  const deliveryFee = subtotal > 0 && subtotal < 299 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 z-[200] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-bg z-[201] shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-white">
          <h2 className="font-sora font-extrabold text-[18px] text-text-dark">Your Cart</h2>
          <button onClick={closeCart} className="p-2 -mr-2 text-text-muted hover:text-text-dark transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-bg flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="m-auto flex flex-col items-center justify-center text-center opacity-50">
              <span className="text-4xl mb-4">🛒</span>
              <p className="text-text-dark font-semibold">Your cart is empty.</p>
              <p className="text-sm text-text-muted">Looks like you haven't added anything yet.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex gap-4 p-3 bg-white border border-border rounded-lg shadow-sm">
                <div className="w-[52px] h-[52px] shrink-0 bg-gray-100 rounded overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Img</div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[13px] font-semibold text-text-dark pr-2">{item.name}</h3>
                    <button onClick={() => removeItem(item._id)} className="text-text-muted hover:text-primary transition-colors mt-0.5 shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[14px] font-bold text-primary">₹{item.price}</span>
                    
                    <div className="flex items-center gap-3 bg-bg border border-border rounded">
                      <button onClick={() => updateQty(item._id, -1)} className="w-[24px] h-[24px] flex items-center justify-center text-text-dark hover:text-primary transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="text-[13px] font-semibold w-2 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item._id, 1)} className="w-[24px] h-[24px] flex items-center justify-center text-text-dark hover:text-primary transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border bg-white p-6 pb-8">
            <div className="flex justify-between text-sm text-text-muted mb-2">
              <span>Subtotal</span>
              <span className="text-text-dark font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-text-muted mb-4">
              <span>Delivery Fee</span>
              {deliveryFee === 0 ? (
                <span className="text-accent font-semibold">Free</span>
              ) : (
                <span className="text-text-dark font-medium">₹{deliveryFee.toFixed(2)}</span>
              )}
            </div>
            
            <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-[16px] font-sora font-extrabold text-text-dark">Total</span>
                <span className="text-[18px] font-bold text-primary">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-3 px-6 rounded text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all flex justify-between items-center shadow-md shadow-primary/20">
              <span>Checkout</span>
              <span>₹{total.toFixed(2)} &rarr;</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}