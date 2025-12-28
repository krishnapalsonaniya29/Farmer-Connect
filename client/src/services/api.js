// const BASE_URL = "http://localhost:5000/api";

// const getToken = () => localStorage.getItem("token");

// export const apiFetch = async (endpoint, options = {}) => {
//   const res = await fetch(`${BASE_URL}${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//       ...options.headers,
//     },
//     ...options,
//   });

//   let data;
//   try {
//     data = await res.json();
//   } catch {
//     throw new Error("Invalid server response");
//   }

//   if (!res.ok) {
//     throw new Error(data?.message || "Something went wrong");
//   }

//   return data;
// };
const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = "API request failed";
    try {
      const data = await res.json();
      message = data.message || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
};
