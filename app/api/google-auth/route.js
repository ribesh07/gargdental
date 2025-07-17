// app/api/google-auth/route.ts
import { NextRequest } from "next/server";
import toast from "react-hot-toast";

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
          unique_id: googleUser.kid,
          access_token: 0,
        }),
      }
    );
    console.log(googleUser.email);
    console.log(googleUser.sub);
    if (backendRes.ok) {
      const data = await backendRes.json();
      console.warn("Data response !");
      console.log(data);
      return new Response(JSON.stringify(data), { status: 200, success: true });
    } else {
      // console.log(JSON.stringify(backendRes.error));
      console.log(backendRes.status);
      const data = await backendRes.json();
      console.warn("Error response !");
      toast.error(data?.errors[0]?.message);
      console.log(data);
      return new Response({
        status: backendRes.status,
        success: false,
        message: "Something Went Wronng !",
      });
    }
  } catch (error) {
    console.warn(`Google auth error: ${error}`);
    return new Response(
      JSON.stringify({ error: "Failed to authenticate", success: false }),
      {
        status: 500,
      }
    );
  }
}
