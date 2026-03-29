import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { API_BASE } from './config/backend';

const CATEGORIES = ['All', 'Veg', 'Non-Veg', 'Dairy', 'Chocolates'];

export default function Home() {
  const [activeTab, setActiveTab] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/products`);
        if (res.data) {
          setProducts(res.data.slice(0, 12)); // Display up to 12 featured items
        }
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(p => {
        const cat = activeTab.toLowerCase() === 'non-veg' ? 'nonveg' : activeTab.toLowerCase();
        return p.category.toLowerCase() === cat;
      });

  return (
    <div className="bg-bg min-h-screen">
      {/* Hero Section */}
      <section className="max-w-[1280px] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Hero */}
          <div>
            <div className="inline-block border border-primary text-primary px-3 py-1 rounded-full text-xs font-bold mb-6 bg-rose-50 tracking-wide uppercase">
              🚀 Free delivery above ₹299
            </div>
            <h1 className="font-sora font-extrabold text-[52px] leading-[1.15] tracking-[-1.5px] text-text-dark mb-6">
              Savor Every Bite,<br/> Delivered Fresh
            </h1>
            <p className="text-text-muted text-[17px] mb-8 leading-[1.6] max-w-md">
              Experience the finest curated meals and premium groceries from our certified kitchens directly to your doorstep.
            </p>
            
            <div className="flex items-center gap-4 mb-12">
              <button className="bg-primary text-white py-3.5 px-8 rounded text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all shadow-md shadow-primary/20">
                Explore Menu
              </button>
            <button className="border-2 border-border text-text-dark py-3.5 px-8 rounded text-sm font-semibold hover:border-text-dark transition-all">
                How it works
              </button>
            </div>

            <div className="flex items-center gap-8 border-t border-border pt-8 mt-4">
              <div>
                <p className="font-sora font-extrabold text-2xl text-text-dark">12k+</p>
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider mt-1">Customers</p>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div>
                <p className="font-sora font-extrabold text-2xl text-text-dark">150+</p>
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider mt-1">Daily Items</p>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div>
                <p className="font-sora font-extrabold text-2xl text-text-dark flex items-center gap-1">
                  4.9 <span className="text-yellow-400 text-xl">★</span>
                </p>
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider mt-1">App Rating</p>
              </div>
            </div>
          </div>

          {/* Right Hero (Images) */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Main Image */}
            <div className="absolute top-0 right-10 w-[280px] h-[360px] rounded-2xl bg-gradient-to-br from-rose-100 to-rose-200 overflow-hidden shadow-2xl z-20 border-4 border-white">
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1" alt="Delicious Food" className="w-full h-full object-cover opacity-95"/>
            </div>
            {/* Secondary Image */}
            <div className="absolute bottom-10 left-10 w-[200px] h-[260px] rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 overflow-hidden shadow-xl z-10 border-4 border-white">
              <img src="https://images.unsplash.com/photo-1546069901-be18e2be82ce" alt="Healthy Food" className="w-full h-full object-cover opacity-95"/>
            </div>
            {/* Tertiary Box */}
            <div className="absolute top-1/2 left-4 w-[140px] h-[150px] rounded-xl bg-white shadow-lg z-30 flex flex-col items-center justify-center p-4 border border-border translate-y-[-50%]">
               <span className="text-3xl mb-2">🏆</span>
               <p className="font-sora font-bold text-sm text-center">Top Rated Chef</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="border-y border-border bg-white overflow-hidden py-4 whitespace-nowrap flex select-none">
        <div className="animate-marquee flex gap-12 text-sm font-semibold uppercase tracking-[0.2em] text-text-dark w-max">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-12">Veg<span className="w-1.5 h-1.5 rounded-full bg-primary bg-opacity-60"></span></span>
              <span className="flex items-center gap-12">Non-Veg<span className="w-1.5 h-1.5 rounded-full bg-primary bg-opacity-60"></span></span>
              <span className="flex items-center gap-12">Dairy<span className="w-1.5 h-1.5 rounded-full bg-primary bg-opacity-60"></span></span>
              <span className="flex items-center gap-12">Chocolates<span className="w-1.5 h-1.5 rounded-full bg-primary bg-opacity-60"></span></span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="max-w-[1280px] mx-auto px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-sora font-extrabold text-[32px] tracking-[-0.5px] text-text-dark mb-2">Featured Menu</h2>
            <p className="text-text-muted">Handpicked favorites curated just for you.</p>
          </div>
          <a href="/veg" className="text-primary font-bold text-sm hover:underline">View all menu &rarr;</a>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors ${
                activeTab === cat 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'bg-white border border-border text-text-muted hover:text-text-dark hover:border-text-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product._id} {...product} />
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-text-muted">
                No featured products found.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
