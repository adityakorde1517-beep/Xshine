import { NextResponse } from "next/server";

async function createSignature(timestamp) {
  const secret = process.env.ADMIN_SECRET;

  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(timestamp)
  );

  return Array.from(
    new Uint8Array(signatureBuffer)
  )
    .map((byte) =>
      byte.toString(16).padStart(2, "0")
    )
    .join("");
}

async function isValidToken(token) {
  if (!token || !process.env.ADMIN_SECRET) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [timestamp, signature] = parts;

  const tokenTime = Number(timestamp);

  if (!Number.isFinite(tokenTime)) {
    return false;
  }

  // Token expires after 24 hours
  const tokenAge = Date.now() - tokenTime;

  if (
    tokenAge < 0 ||
    tokenAge > 60 * 60 * 24 * 1000
  ) {
    return false;
  }

  const expectedSignature =
    await createSignature(timestamp);

  return signature === expectedSignature;
}

export async function middleware(request) {
  const adminCookie = request.cookies.get(
    "admin_logged_in"
  );

  const valid = await isValidToken(
    adminCookie?.value
  );

  if (!valid) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/message/:path*",
    "/admin/products/:path*",
  ],
};