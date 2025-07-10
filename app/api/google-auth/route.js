// app/api/google-auth/route.ts
import { NextRequest } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { token } = body;
    console.warn(token);

    // Optional: verify token with Google
    const googleRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    const googleUser = await googleRes.json();
    console.log(googleUser);
    // Forward to your real backend
    const backendRes = await fetch(
      "https://gargdental.omsok.com/api/v1/auth/social/google-register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          unique_id: googleUser.kid, // from token
          email: googleUser.sub,
          phone: "9800000000", // optional
        }),
      }
    );

    const data = await backendRes.json();
    console.log(data);
    return new Response(JSON.stringify(data), { status: 200, success: true });
  } catch (error) {
    console.error("Google auth error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to authenticate", success: false }),
      {
        status: 500,
      }
    );
  }
}
