import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const current = await getCurrentUser();

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
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch leads",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const current = await getCurrentUser();

    const body = await req.json();

    const {
      name,
      email,
      phone,
      budget,
      location,
    } = body;

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        budget,
        location,
        organizationId: current.organization.id,
      },
    });

    return NextResponse.json({
      lead,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create lead",
      },
      {
        status: 500,
      }
    );
  }
}
