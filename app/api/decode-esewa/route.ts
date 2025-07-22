import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const data = searchParams.get("data");

  if (!data) {
    return NextResponse.json({
      error: 'Missing "data" query parameter',
      success: false,
    });
  }

  try {
    const jsonStr = Buffer.from(data, "base64").toString("utf-8");
    const parsedData = JSON.parse(jsonStr);
    console.log(parsedData);

    return NextResponse.json({ decoded: parsedData, success: true });
  } catch (error) {
    return NextResponse.json({
      error: "Invalid Base64 or JSON format",
      success: true,
    });
  }
}
