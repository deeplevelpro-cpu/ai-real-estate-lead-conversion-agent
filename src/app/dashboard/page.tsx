import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function DashboardPage() {
  await auth.protect();

  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          AI Real Estate Lead Conversion Agent
        </h1>

        <UserButton />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">
          Dashboard
        </h2>

        <p className="mt-4 text-gray-600">
          Welcome to your AI-powered real estate lead conversion workspace.
        </p>
      </section>
    </main>
  );
}
