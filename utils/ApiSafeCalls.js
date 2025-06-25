import { baseUrl } from "./config";

export const apiRequest = async (url, options = {}) => {
  url = `${baseUrl}${url}`;
  const token = localStorage.getItem("token");
  console.warn(token);
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
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

export const apiPostRequest = async (url, data) =>
  apiRequest(url, { method: "POST", body: JSON.stringify(data) });

//const data = await apiRequest("https://api.example.com/profile");

//const data = await apiPost("https://api.example.com/profile", { name: "John Doe" });
// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     router.push("/account");
//   }
// }, []);
