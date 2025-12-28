export const isAuthenticated = () => {
  return localStorage.getItem("fc_user") !== null;
};
