import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Extract the 'id' from the URL
    const urlParts = req.url.split("/");
    const id = urlParts[urlParts.length - 1];

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing ID" },
        { status: 400 }
      );
    }

    const response = await fetch(`/api/v1/news/${id}`); // ✅ Corrected API URL
    const data = await response.json();

    if (!data.success) {
      return NextResponse.json(
        { success: false, error: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: data.data });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
