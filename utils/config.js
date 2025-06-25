export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseUrl) {
  console.error("Missing NEXT_PUBLIC_API_URL environment variable!");
}
