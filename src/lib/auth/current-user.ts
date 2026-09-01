import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Clerk user not found");
  }

  let user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email:
          clerkUser.emailAddresses[0]?.emailAddress ??
          `${userId}@clerk.local`,
        name:
          `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
          null,
      },
    });
  }

  let membership = await prisma.membership.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      organization: true,
    },
  });

  if (!membership) {
    const organization = await prisma.organization.create({
      data: {
        name: `${user.name ?? "My"} Real Estate`,
      },
    });

    membership = await prisma.membership.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        role: "owner",
      },
      include: {
        organization: true,
      },
    });
  }

  return {
    user,
    organization: membership.organization,
    role: membership.role,
  };
}
