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
  console.log("data", data);
  if (data.success || response.ok) {
    return data;
  } else {
    return data;
  }
};

export const apiPostRequest = async (url, data, tokenReq = true) =>
  apiRequest(url, tokenReq, { method: "POST", body: JSON.stringify(data) });
