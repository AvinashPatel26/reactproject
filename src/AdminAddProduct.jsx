import React, { useState } from "react";
import axios from "./api/axios";
import { toast } from "react-toastify";
import { UploadCloud } from "lucide-react"; // Make sure lucide-react is installed!
// import "./AdminAddProduct.css"; // You can safely delete this file

function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "veg",
    price: "",
    description: "",
    rating: "4.5", // Default rating
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create a temporary URL to show an instant preview of the image
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.warning("Please select a product image! 📸");
      return;
    }

    try {
      setLoading(true);

      // 1. Upload the image first
      const imgData = new FormData();
      imgData.append("file", image);

      const imgRes = await axios.post("/images/upload", imgData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 2. Submit the product details with the returned image URL
      await axios.post("/products", {
        ...form,
        price: Number(form.price),
        rating: Number(form.rating),
        imageurl: imgRes.data,
      });

      toast.success("Product added successfully! 🎉");

      // Reset the form
      setForm({
        name: "",
        category: "veg",
        price: "",
        description: "",
        rating: "4.5",
      });
      setImage(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Error adding product. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
      {/* HEADER */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800">
          🛠️ Admin Dashboard
        </h2>
        <p className="text-gray-500 mt-2">
          Add a new delicious item to the menu.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NAME */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Paneer Tikka"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                required
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition cursor-pointer"
              >
                <option value="veg">Vegetarian 🥗</option>
                <option value="nonveg">Non-Vegetarian 🍗</option>
                <option value="milk">Dairy / Milk 🥛</option>
                <option value="chocolate">Chocolate 🍫</option>
              </select>
            </div>

            {/* PRICE */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="299"
                min="0"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                required
              />
            </div>

            {/* RATING */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Initial Rating
              </label>
              <input
                type="number"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                placeholder="4.5"
                step="0.1"
                min="0"
                max="5"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                required
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the dish..."
              rows="3"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
              required
            ></textarea>
          </div>

          {/* IMAGE UPLOAD & PREVIEW */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Product Image
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Custom File Input Upload Area */}
              <label className="flex flex-col items-center justify-center w-full sm:w-1/2 h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 font-medium">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* Image Preview Box */}
              {previewUrl ? (
                <div className="w-full sm:w-1/2 h-40 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-sm font-bold">
                    Selected
                  </div>
                </div>
              ) : (
                <div className="w-full sm:w-1/2 h-40 rounded-2xl border border-gray-200 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No image selected
                </div>
              )}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white font-bold text-lg py-4 rounded-xl hover:bg-orange-600 transition shadow-lg hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Uploading & Saving..." : "Add Product to Menu 🍽️"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddProduct;
