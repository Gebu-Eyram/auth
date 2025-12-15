import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://kentecode-api.vercel.app";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { detail: "Email and password are required" },
        { status: 422 }
      );
    }

    // Call the backend API to register the user
    console.log(
      "Registering user with API:",
      `${API_BASE_URL}/v1/auth/register`
    );

    const response = await fetch(`${API_BASE_URL}/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log("Registration response:", { status: response.status, data });

    if (!response.ok) {
      return NextResponse.json(
        { detail: data.detail || "Registration failed" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { detail: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
