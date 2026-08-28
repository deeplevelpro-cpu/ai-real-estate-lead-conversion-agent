import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";

export async function requireLeadAccess(leadId: string) {
  const current = await getCurrentUser();

  const lead = await prisma.lead.findFirst({
    where: {
      id: leadId,
      organizationId: current.organization.id,
    },
  });

  if (!lead) {
    throw new Error("Lead access denied");
  }

  return {
    current,
    lead,
  };
}

