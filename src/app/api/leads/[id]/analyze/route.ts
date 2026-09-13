import { NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth/require-auth";
import { prisma } from "@/lib/prisma";
import { analyzeLead } from "@/lib/ai/lead-scoring";

export async function POST(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const current = await requireAuth();

    const { id } = await context.params;

    const lead = await prisma.lead.findFirst({
      where: {
        id,
        organizationId: current.organization.id,
      },
    });

    if (!lead) {
      return NextResponse.json(
        {
          error: {
            code: "NOT_FOUND",
            message: "Lead not found",
          },
        },
        {
          status: 404,
        }
      );
    }

    const analysis = await analyzeLead({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      location: lead.location,
      budget: lead.budget,
      status: lead.status,
    });

    const updatedLead = await prisma.lead.update({
      where: {
        id: lead.id,
      },
      data: {
        score: analysis.score,
        temperature: analysis.temperature,
        aiIntent: analysis.intent,
        aiSummary: analysis.summary,
        lastAnalyzedAt: new Date(),
      },
    });

    return NextResponse.json({
      lead: updatedLead,
      analysis,
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
