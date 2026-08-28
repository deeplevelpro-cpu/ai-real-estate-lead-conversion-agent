

import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
throw new Error("Unauthorized");
  }

  const membership = await prisma.membership.findFirst({
    where: {
      userId: session.userId,
    },
    include: {
      organization: true,
    },
  });

  if (!membership) {
    throw new Error("User has no organization");
  }

  return {
    user: session.user,
    organization: membership.organization,
    role: membership.role,
  };
}
