import crypto from "crypto";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION * 1000
  );

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return token;
}

export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    await deleteSession();
    return null;
  }

  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    return;
  }

  await prisma.session.deleteMany({
    where: {
      token,
    },
  });

  cookieStore.delete("session");
}
