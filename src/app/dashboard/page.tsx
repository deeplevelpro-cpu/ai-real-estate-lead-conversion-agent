import { getCurrentUser } from "@/lib/auth/current-user";
import LogoutButton from "@/components/logout-button";

export default async function DashboardPage() {
  const current = await getCurrentUser();

  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">
          AI Real Estate Dashboard
        </h1>

        <LogoutButton />
      </div>

      <div className="mt-8 space-y-2">
        <p>
          Welcome,{" "}
          {current.user.name ?? current.user.email}
        </p>

        <p>
          Organization: {current.organization.name}
        </p>

        <p>
          Role: {current.role}
        </p>
      </div>
    </main>
  );
}
