import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import LogoutButton from "@/components/logout-button";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">
          AI Real Estate Dashboard
        </h1>

        <LogoutButton />
      </div>

      <p className="mt-4">
        Welcome, {session.user.name ?? session.user.email}
      </p>
    </main>
  );
}
