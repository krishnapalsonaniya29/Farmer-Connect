import { apiFetch } from "./api";

/* =========================
   Equipment
   ========================= */

// Public marketplace
export const getAllEquipmentAPI = () => apiFetch("/equipment");

// My equipment
export const getMyEquipmentAPI = () => apiFetch("/equipment/my");

// Add equipment
export const addEquipmentAPI = (formData) =>
  apiFetch("/equipment", {
    method: "POST",
    body: formData,
  });

// Delete equipment
export const deleteEquipmentAPI = (id) =>
  apiFetch(`/equipment/${id}`, {
    method: "DELETE",
  });

// Toggle availability
export const toggleEquipmentAPI = (id) =>
  apiFetch(`/equipment/${id}/toggle`, {
    method: "PATCH",
  });
