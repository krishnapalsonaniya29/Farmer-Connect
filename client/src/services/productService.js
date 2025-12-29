import { apiFetch } from "./api";

/* =========================
   Products
========================= */

// ➕ Add product
export const addProductAPI = (formData) =>
  apiFetch("/api/products", {
    method: "POST",
    body: formData,
  });

// 📦 Get my products
export const getMyProductsAPI = () => apiFetch("/api/products/my");

// 🗑 Delete product
export const deleteProductAPI = (id) =>
  apiFetch(`/api/products/${id}`, {
    method: "DELETE",
  });
