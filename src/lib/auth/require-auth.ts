import { getCurrentUser } from "@/lib/auth/current-user";

export async function requireAuth() {
  try {
    return await getCurrentUser();
  } catch {
    throw new Error("UNAUTHORIZED");
  }
}

