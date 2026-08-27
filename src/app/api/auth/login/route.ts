import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

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

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return Response.json(
        {
          error: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    const validPassword = await verifyPassword(
      password,
      user.passwordHash,
      user.salt
    );

    if (!validPassword) {
      return Response.json(
        {
          error: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    await createSession(user.id);

    return Response.json({
      success: true,
      userId: user.id,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Login failed",
      },
      {
        status: 500,
      }
    );
  }
}

