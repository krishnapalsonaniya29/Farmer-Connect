import { apiFetch } from "./api";

/* =========================
   Equipment
   ========================= */

// Public marketplace
export const getAllEquipmentAPI = () => apiFetch("/api/equipment");

// My equipment
export const getMyEquipmentAPI = () => apiFetch("/api/equipment/my");

// Add equipment
export const addEquipmentAPI = (formData) =>
  apiFetch("/api/equipment", {
    method: "POST",
    body: formData,
  });

// Delete equipment
export const deleteEquipmentAPI = (id) =>
  apiFetch(`/api/equipment/${id}`, {
    method: "DELETE",
  });

// Toggle availability
export const toggleEquipmentAPI = (id) =>
  apiFetch(`/api/equipment/${id}/toggle`, {
    method: "PATCH",
  });
