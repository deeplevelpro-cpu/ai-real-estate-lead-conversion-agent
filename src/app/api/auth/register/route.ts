import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!email || !password) {
      return Response.json(
        {
          error: "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return Response.json(
        {
          error: "User already exists",
        },
        {
          status: 409,
        }
      );
    }

    const { hash, salt } = await hashPassword(password);

    const { user, organization } = await prisma.$transaction(
      async (tx) => {
        const user = await tx.user.create({
          data: {
            name,
            email,
            passwordHash: hash,
            salt,
          },
        });

        const organization = await tx.organization.create({
          data: {
            name: `${name ?? "My"} Organization`,
          },
        });

        await tx.membership.create({
          data: {
            userId: user.id,
            organizationId: organization.id,
            role: "owner",
          },
        });

        return {
          user,
          organization,
        };
      }
    );

    await createSession(user.id);

    return Response.json({
      success: true,
      userId: user.id,
      organizationId: organization.id,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Registration failed",
      },
      {
        status: 500,
      }
    );
  }
}
