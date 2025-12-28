export const updateProfileAPI = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/update`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Update failed");
  }

  return res.json();
};
