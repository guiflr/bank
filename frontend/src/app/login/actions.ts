"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    redirect("/login?error=API_BASE_URL_NOT_FOUND");
  }

  const payload = {
    username: String(formData.get("username") || ""),
    password: String(formData.get("password") || ""),
  };

  const response = await fetch(`${baseUrl}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok || data.message) {
    const message = data.message || "Falha ao autenticar";
    redirect(`/login?error=${encodeURIComponent(message)}`);
  }

  if (data.token) {
    const cookieStore = await cookies();
    cookieStore.set("access_token", data.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }

  redirect("/dashboard");
}
