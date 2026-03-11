import { useState } from "react";
import axios from "./api/axios";
import "./AdminAddProduct.css";

function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "veg",
    price: "",
    description: "",
    rating: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return;

    try {
      setLoading(true);

      const imgData = new FormData();
      imgData.append("file", image);

      const imgRes = await axios.post("/images/upload", imgData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await axios.post("/products", {
        ...form,
        price: Number(form.price),
        rating: Number(form.rating),
        imageurl: imgRes.data,
      });

      alert("Product added successfully!");
      setForm({
        name: "",
        category: "veg",
        price: "",
        description: "",
        rating: "",
      });
      setImage(null);
      e.target.reset();
    } catch (err) {
      alert("Error adding product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg admin-add-card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4 text-primary">
                Add New Product
              </h3>
              <form onSubmit={handleSubmit} className="admin-add-form">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <select
                    name="category"
                    className="form-select"
                    value={form.category}
                    onChange={handleChange}
                  >
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-Veg</option>
                    <option value="milk">Milk</option>
                    <option value="chocolate">Chocolate</option>
                  </select>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={form.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Rating</label>
                    <input
                      type="number"
                      name="rating"
                      className="form-control"
                      value={form.rating}
                      onChange={handleChange}
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="3"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Short description about the product"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Add Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAddProduct;
