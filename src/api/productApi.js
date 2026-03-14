import api from "./axios";

export const getProductsByCategory = async (category) => {
  try {
    const res = await api.get(`/api/products/category/${category}`);
    return res.data;
  } catch (error) {
    console.error("Category fetch error:", error);
    return [];
  }
};