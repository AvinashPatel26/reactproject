import axios from "./axios";

export const getProducts = () => axios.get("/products");

export const addProduct = (product) =>
  axios.post("/products", product);

export const deleteProduct = (id) =>
  axios.delete(`/products/${id}`);
