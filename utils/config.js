export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const MERCHANTID = process.env.NEXT_PUBLIC_CONNECTIPS_MERCHANTID ;
export const APPID = process.env.NEXT_PUBLIC_CONNECTIPS_APPID ;
export const APPNAME = process.env.NEXT_PUBLIC_CONNECTIPS_APPNAME ;
export const CONNECTIPS_API_URL = process.env.NEXT_PUBLIC_CONNECTIPS_API_URL ;
export const CONNECTIPS_BASE_URL = process.env.NEXT_PUBLIC_CONNECTIPS_BASE_URL ;

if (!baseUrl) {
  console.error("Missing NEXT_PUBLIC_API_URL environment variable!");
}

// import Cookies from "js-cookie";

// export const isTokenValid = () => {
//   const token = Cookies.get("token");
//   return !!token;
// };
