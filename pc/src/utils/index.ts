export const currentOrg = () => {
  try {
    const res = JSON.parse(localStorage.getItem("currentOrg") || "");
    return res;
  } catch {
    return undefined;
  }
};
