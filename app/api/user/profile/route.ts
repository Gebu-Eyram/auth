import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://kentecode-api.vercel.app";

export async function GET(request: NextRequest) {
  try {
    // Extract authorization token from request headers
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { detail: "Authorization token is required" },
        { status: 401 }
      );
    }

    console.log(
      "Fetching user profile from API:",
      `${API_BASE_URL}/v1/user/profile`
    );

    // Call the backend API to get user profile
    const response = await fetch(`${API_BASE_URL}/v1/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    });

    const data = await response.json();
    console.log("Profile response:", { status: response.status, data });

    if (!response.ok) {
      return NextResponse.json(
        { detail: data.detail || "Failed to fetch profile" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { detail: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
