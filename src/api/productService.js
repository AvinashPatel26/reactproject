import api from "./axios";

/* GET ALL PRODUCTS */

export const getProducts = async () => {
  const res = await api.get("/api/products");
  return res.data;
};

/* GET PRODUCTS BY CATEGORY */

export const getProductsByCategory = async (category) => {
  const res = await api.get(`/api/products/category/${category}`);
  return res.data;
};

/* ADD PRODUCT */

export const addProduct = async (product) => {
  const res = await api.post("/api/products", product);
  return res.data;
};

/* DELETE PRODUCT */

export const deleteProduct = async (id) => {
  const res = await api.delete(`/api/products/${id}`);
  return res.data;
};