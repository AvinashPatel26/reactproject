import React, { useState } from "react";
import { User, MapPin, Package, LogOut, Edit2, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Guest User";
  const userRole = localStorage.getItem("userRole") || "user";

  // Mocking saved addresses for the UI
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Home", text: "123 Tasty Street, Food City, IN 40001" },
    { id: 2, type: "Work", text: "Tech Park, Building 4, IN 40002" },
  ]);

  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out successfully");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 min-h-[70vh]">
      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT COLUMN - Profile Card */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-orange-400 to-red-500 z-0"></div>

            <div className="relative z-10 mt-10">
              <div className="w-28 h-28 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg border-4 border-white mb-4">
                <User size={50} className="text-orange-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-800">
                {userName}
              </h2>
              <p className="text-gray-500 font-medium capitalize mb-6">
                {userRole} Account
              </p>

              <div className="space-y-3">
                <Link
                  to="/orders"
                  className="flex items-center justify-center gap-2 w-full bg-orange-50 text-orange-600 font-bold py-3 rounded-xl hover:bg-orange-100 transition"
                >
                  <Package size={18} /> My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Saved Addresses */}
        <div className="md:w-2/3">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 h-full">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <h3 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
                <MapPin className="text-orange-500" /> Saved Addresses
              </h3>
              <button className="flex items-center gap-1 text-sm font-bold text-orange-500 bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-100 transition">
                <Plus size={16} /> Add New
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="border-2 border-gray-100 p-5 rounded-2xl hover:border-orange-400 transition group relative"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider group-hover:bg-orange-100 group-hover:text-orange-600 transition">
                      {address.type}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed pr-6">
                    {address.text}
                  </p>

                  <button className="absolute top-4 right-4 text-gray-400 hover:text-orange-500 transition">
                    <Edit2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
