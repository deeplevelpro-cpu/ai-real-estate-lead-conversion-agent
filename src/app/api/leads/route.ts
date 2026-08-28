import { createLeadSchema } from "@/lib/validation/create-lead";
import { NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth/require-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const current = await requireAuth();

    const leads = await prisma.lead.findMany({
      where: {
        organizationId: current.organization.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      leads,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {
      return NextResponse.json(
        {
          error: {
            code: "UNAUTHORIZED",
            message: "Unauthorized",
          },
        },
        {
          status: 401,
        }
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Internal server error",
        },
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const current = await requireAuth();

        const body = await req.json();

    const result = createLeadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: {
            code: "BAD_REQUEST",
            message: "Invalid lead data",
          },
        },
        {
          status: 400,
        }
      );
    }
    const lead = await prisma.lead.create({
data: {
  ...result.data,
  organizationId: current.organization.id,
},
    });

    return NextResponse.json({
      lead,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {
      return NextResponse.json(
        {
          error: {
            code: "UNAUTHORIZED",
            message: "Unauthorized",
          },
        },
        {
          status: 401,
        }
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Internal server error",
        },
      },
      {
        status: 500,
      }
    );
  }
}
