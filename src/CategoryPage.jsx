import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters state
  const [priceRange, setPriceRange] = useState(999);
  const [sortBy, setSortBy] = useState('popularity');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const endpoint = category 
        ? `http://localhost:8080/api/products?category=${category}` 
        : `http://localhost:8080/api/products`;
        
      const response = await axios.get(endpoint);
      if (response.data) {
        setProducts(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch categorized products:", err);
      setProducts([]); // Cleanly fail with empty products
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const handleApplyFilters = () => {
    let updated = [...products].filter(p => p.price <= priceRange);
    
    if (sortBy === 'price_asc') updated.sort((a,b) => a.price - b.price);
    if (sortBy === 'price_desc') updated.sort((a,b) => b.price - a.price);
    setProducts(updated);
  };

  return (
    <div className="bg-bg min-h-screen">
      <div className="max-w-[1280px] mx-auto px-8 py-10 lg:py-20">
        
        <div className="mb-10 lg:mb-16">
          <h1 className="font-sora font-extrabold text-[32px] text-text-dark capitalize">
            {category || 'All Products'}
          </h1>
          <p className="text-text-muted mt-2">Discover our premium selection of fresh {category} items.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          {/* Left Sidebar Filters */}
          <div className="bg-card border border-border rounded-lg p-6 self-start">
            <h2 className="font-sora font-bold text-[18px] text-text-dark mb-6">Filters</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-text-dark mb-3">
                Max Price: <span className="text-primary font-bold">₹{priceRange}</span>
              </label>
              <input 
                type="range" 
                min="0" max="999" 
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-text-muted mt-2">
                <span>₹0</span>
                <span>₹999</span>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-text-dark mb-3">Sort By</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-bg border border-border text-sm rounded py-2.5 px-3 outline-none focus:border-primary transition-colors cursor-pointer text-text-dark"
              >
                <option value="popularity">Popularity</option>
                <option value="price_asc">Price: Low-High</option>
                <option value="price_desc">Price: High-Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <button 
              onClick={handleApplyFilters}
              className="w-full bg-white border border-border text-text-dark font-semibold text-sm py-2.5 rounded hover:border-text-dark active:bg-gray-50 transition-colors shadow-sm"
            >
              Apply Filters
            </button>
          </div>

          {/* Right Area Grid */}
          <div>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-card border border-border rounded-lg overflow-hidden h-[260px]">
                    <div className="bg-border h-40 w-full" />
                    <div className="p-3">
                      <div className="bg-border h-4 w-3/4 mb-2" />
                      <div className="bg-border h-3 w-1/2 mb-4" />
                      <div className="flex justify-between mt-4">
                        <div className="bg-border h-5 w-1/4" />
                        <div className="bg-border h-7 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map(product => <ProductCard key={product._id} {...product} />)
                ) : (
                  <div className="col-span-full py-20 text-center text-text-muted">
                    No products found for this category.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
