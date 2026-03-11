import api from "./axios";

export const getProductsByCategory = async (category) => {
  const res = await api.get(`/products?category=${category}`);
  return res.data;
};
