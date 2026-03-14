import api from "./axios";

/* GET ALL PRODUCTS */

export const getProducts = async () => {
  try {
    const res = await api.get("/api/products");

    // support both formats
    return res.data.products || res.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


/* GET PRODUCTS BY CATEGORY */

export const getProductsByCategory = async (category) => {
  try {
    const res = await api.get(`/api/products/category/${category}`);

    // support both formats
    return res.data.products || res.data || [];
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
};


/* ADD PRODUCT */

export const addProduct = async (product) => {
  try {
    const res = await api.post("/api/products", product);
    return res.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};


/* DELETE PRODUCT */

export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/api/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};