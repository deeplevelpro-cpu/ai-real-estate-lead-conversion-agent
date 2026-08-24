import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-end">
        <UserButton />
      </div>

      <div className="flex min-h-[80vh] items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold">
            AI Real Estate Dashboard
          </h1>

          <p className="mt-4">
            Welcome. Your workspace is ready.
          </p>
        </div>
      </div>
    </main>
  );
}
