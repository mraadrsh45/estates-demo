import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/email";

// Simple in-memory rate limiting (per Vercel serverless function instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((i) => i.message).join(", ");
    return NextResponse.json(
      { success: false, message: errors },
      { status: 422 }
    );
  }

  try {
    await sendContactEmail(result.data);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] email error:", err);
    return NextResponse.json(
      { success: false, message: "Unable to send enquiry. Please try again." },
      { status: 500 }
    );
  }
}
