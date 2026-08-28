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

    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        budget: body.budget,
        location: body.location,
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
