import { getCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/prisma";
import CreateLeadForm from "@/components/leads/create-lead-form";

export default async function LeadsPage() {
  const current = await getCurrentUser();

  const leads = await prisma.lead.findMany({
    where: {
      organizationId: current.organization.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">
        Leads
      </h1>

      <p className="mt-2">
        Organization: {current.organization.name}
      </p>

      <div className="mt-8">
        <CreateLeadForm />
      </div>

      <div className="mt-8 space-y-4">
        {leads.length === 0 ? (
          <p>No leads found.</p>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded border p-4"
            >
              <h2 className="font-bold">
                {lead.name ?? "Unnamed Lead"}
              </h2>

              <p>Email: {lead.email ?? "N/A"}</p>
              <p>Phone: {lead.phone ?? "N/A"}</p>
              <p>Location: {lead.location ?? "N/A"}</p>
              <p>Budget: {lead.budget ?? "N/A"}</p>
              <p>Status: {lead.status}</p>
              <p>Score: {lead.score}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
