import { apiFetch } from "./api";

/* =========================
   Products
   ========================= */

// Add product
export const addProductAPI = (formData) =>
  apiFetch("/products", {
    method: "POST",
    body: formData,
  });

// Get my products
export const getMyProductsAPI = () => apiFetch("/products/my");

// Delete product
export const deleteProductAPI = (id) =>
  apiFetch(`/products/${id}`, {
    method: "DELETE",
  });
