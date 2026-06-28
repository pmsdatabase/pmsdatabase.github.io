import { NextResponse } from "next/server";

const DATA_URL =
  "https://script.google.com/macros/s/AKfycbxfD7pmUyQwcYahrfpElgPweGnd99vKecuGHp8U4RWD37h2WeJm4Eshzu0clVDM9fyy/exec";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

export const dynamic = "force-static";
export const revalidate = 300;

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

export async function GET() {
  try {
    const res = await fetch(DATA_URL, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch score data: ${res.status}` },
        { status: 502, headers: corsHeaders }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: corsHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown fetch error",
      },
      { status: 502, headers: corsHeaders }
    );
  }
}