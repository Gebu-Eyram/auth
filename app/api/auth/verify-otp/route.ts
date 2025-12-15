import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://kentecode-api.vercel.app";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, token, type = "email" } = body;

    if (!email || !token) {
      return NextResponse.json(
        { detail: "Email and token are required" },
        { status: 422 }
      );
    }

    // Call the backend API to verify OTP
    console.log(
      "Verifying OTP with API:",
      `${API_BASE_URL}/v1/auth/verify-otp`
    );

    const response = await fetch(`${API_BASE_URL}/v1/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        token,
        type,
      }),
    });

    const data = await response.json();
    console.log("OTP verification response:", {
      status: response.status,
      data,
    });

    if (!response.ok) {
      return NextResponse.json(
        { detail: data.detail || "OTP verification failed" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { detail: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
