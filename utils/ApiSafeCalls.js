import { baseUrl } from "./config";
// import getToken from "@/app/api/auth/GetToken";

export const apiRequest = async (url, tokenReq = true, options = {}) => {
  url = `${baseUrl}${url}`;
  const token = localStorage.getItem("token");

  const headers = {
    ...(tokenReq && token && { Authorization: `Bearer ${token}` }),
    ...(options.method !== "GET" && { "Content-Type": "application/json" }),
    ...options.headers,
  };
  const response = await fetch(url, { ...options, headers });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || "Something went wrong");
  }
};

export const apiPostRequest = async (url, data, tokenReq = true) =>
  apiRequest(url, tokenReq, { method: "POST", body: JSON.stringify(data) });

//const data = await apiRequest("/profile");

//const data = await apiPost("/profile", { name: "John Doe" });
// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     router.push("/account");
//   }
// }, []);
