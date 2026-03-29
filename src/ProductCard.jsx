import React from 'react';
import useCartStore from './store/cartStore';

const categoryBgMap = {
  Veg: '#ECFDF5',
  'Non-Veg': '#FFF1f2',
  Dairy: '#EFF6FF',
  Chocolates: '#FAF5FF',
};

function ProductCard({ _id, name, description, price, originalPrice, image, category, isVeg }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click event if any
    addItem({ _id, name, price, image, category, isVeg });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-200">
      {/* Image zone — 160px tall, colored bg with emoji fallback, zoom on hover */}
      <div className="h-40 relative overflow-hidden" style={{ backgroundColor: categoryBgMap[category] || '#F4F4F5' }}>
        {image && (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        )}
        {/* Veg/Non-Veg indicator — top-left */}
        <div className={`absolute top-2 left-2 w-5 h-5 border-[1.5px] rounded-sm flex items-center justify-center bg-white ${isVeg ? 'border-accent' : 'border-primary'}`}>
          <div className={`w-2 h-2 rounded-full ${isVeg ? 'bg-accent' : 'bg-primary'}`} />
        </div>
      </div>
      
      <div className="p-3">
        <p className="font-semibold text-[13px] text-text-dark">{name}</p>
        <p className="text-[11px] text-text-muted mt-0.5 mb-2.5 truncate">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-[15px] font-bold text-primary">₹{price}</span>
            {originalPrice && (
              <span className="text-[11px] text-text-muted line-through">₹{originalPrice}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart} 
            className="bg-primary text-white text-[12px] font-semibold px-3 py-1.5 rounded hover:bg-primary-hover active:scale-[0.98] transition-all"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;