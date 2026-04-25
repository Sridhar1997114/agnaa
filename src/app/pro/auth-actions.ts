"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "el-pro-session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

export async function loginWithCredentials(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  const validEmail = process.env.PRO_USERNAME?.trim().toLowerCase();
  const validPassword = process.env.PRO_PASSWORD;

  if (!email || !password || email !== validEmail || password !== validPassword) {
    return { error: "Invalid credentials. Access denied." };
  }

  const payload = Buffer.from(
    JSON.stringify({ email, ts: Date.now(), secret: process.env.PRO_SESSION_SECRET })
  ).toString("base64");

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, payload, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });

  redirect("/pro");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/pro/login");
}
