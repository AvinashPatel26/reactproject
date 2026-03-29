import React from 'react';

export default function Profile() {
  const userName = localStorage.getItem('userName') || 'John Doe';
  const email = 'john.doe@example.com'; 
  const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const orders = [
    { id: '#ORD-8821', date: 'Oct 24, 2026', total: 648, status: 'Delivered', items: 3 },
    { id: '#ORD-8719', date: 'Oct 19, 2026', total: 349, status: 'Delivered', items: 1 },
    { id: '#ORD-8501', date: 'Oct 02, 2026', total: 1150, status: 'Cancelled', items: 4 },
  ];

  return (
    <div className="bg-bg min-h-screen py-10 lg:py-20">
      <div className="max-w-[1024px] mx-auto px-8 relative">
        <h1 className="font-sora font-extrabold text-[32px] text-text-dark mb-10">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">
          
          {/* Left Column: Profile Card */}
          <div className="self-start">
            <div className="bg-card border border-border rounded-lg p-8 text-center shadow-sm">
              <div className="w-20 h-20 bg-text-dark text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-text-dark/20">
                {initials}
              </div>
              <h2 className="font-sora font-extrabold text-[20px] text-text-dark mb-1">{userName}</h2>
              <p className="text-sm text-text-muted mb-6">{email}</p>
              
              <button className="w-full bg-bg border border-border text-text-dark font-semibold text-sm py-2.5 rounded hover:border-text-dark active:bg-gray-50 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Right Column: Sections */}
          <div className="flex flex-col gap-8">
            
            {/* Order History */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-end mb-6">
                <h3 className="font-sora font-bold text-[18px] text-text-dark">Order History</h3>
                <button className="text-primary font-bold text-sm hover:underline">View All</button>
              </div>
              
              <div className="flex flex-col gap-4">
                {orders.map(order => (
                  <div key={order.id} className="border border-border rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer">
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-text-dark">{order.id}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${
                          order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted mt-1">{order.date} • {order.items} Items</p>
                    </div>
                    <div className="font-bold text-primary text-[15px]">
                      ₹{order.total}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Management */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
               <h3 className="font-sora font-bold text-[18px] text-text-dark mb-6">Saved Addresses</h3>
               <div className="border border-border rounded p-4 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                 <p className="font-semibold text-text-dark text-sm mb-1">Home</p>
                 <p className="text-xs text-text-muted leading-relaxed max-w-sm">A203, Alpine Apartments, 4th Cross Road, Koramangala 5th Block, Bangalore 560095</p>
               </div>
               <button className="mt-4 text-text-dark font-bold text-sm hover:text-primary transition-colors">+ Add New Address</button>
            </div>

            {/* Payment Methods */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
               <h3 className="font-sora font-bold text-[18px] text-text-dark mb-6">Payment Methods</h3>
               <div className="border border-border rounded p-4 flex items-center gap-4 group cursor-pointer hover:border-text-muted transition-colors">
                 <div className="w-10 h-6 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[10px] font-bold">VISA</div>
                 <div>
                   <p className="font-semibold text-text-dark text-sm">•••• •••• •••• 4242</p>
                   <p className="text-[11px] text-text-muted">Expires 12/28</p>
                 </div>
               </div>
               <button className="mt-4 text-text-dark font-bold text-sm hover:text-primary transition-colors">+ Add Payment Method</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
