const BASE_URL = "http://localhost:5000/api";

const getToken = () => localStorage.getItem("token");

export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      ...options.headers,
    },
    ...options,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};
