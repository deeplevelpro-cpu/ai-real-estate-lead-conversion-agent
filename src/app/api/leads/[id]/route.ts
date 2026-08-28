import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireLeadAccess } from "@/lib/auth/authorization";
import { updateLeadSchema } from "@/lib/validation/lead";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  req: Request,
  context: Context
) {
  try {
    const { id } = await context.params;

    await requireLeadAccess(id);

    const body = await req.json();

    const result = updateLeadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
        },
        {
          status: 400,
        }
      );
    }

    const lead = await prisma.lead.update({
      where: {
        id,
      },
      data: result.data,
    });

    return NextResponse.json({
      lead,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to update lead",
      },
      {
        status: 500,
      }
    );
  }
}
