import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-8">
      <section className="mx-auto max-w-5xl py-20">
        <h1 className="text-5xl font-bold tracking-tight">
          AI Real Estate Lead Conversion Agent
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          Convert real estate leads into qualified opportunities using
          AI-powered conversations, lead scoring, and intelligent follow-ups.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/sign-up"
            className="rounded bg-black px-6 py-3 text-white"
          >
            Get Started
          </Link>

          <Link
            href="/sign-in"
            className="rounded border px-6 py-3"
          >
            Sign In
          </Link>

          <Link
            href="/dashboard"
            className="rounded border px-6 py-3"
          >
            Dashboard
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="rounded border p-6">
          <h2 className="text-xl font-semibold">
            AI Lead Scoring
          </h2>
          <p className="mt-2 text-gray-600">
            Automatically identify high-value prospects.
          </p>
        </div>

        <div className="rounded border p-6">
          <h2 className="text-xl font-semibold">
            Smart Conversations
          </h2>
          <p className="mt-2 text-gray-600">
            Engage leads with intelligent AI responses.
          </p>
        </div>

        <div className="rounded border p-6">
          <h2 className="text-xl font-semibold">
            Conversion Analytics
          </h2>
          <p className="mt-2 text-gray-600">
            Track performance and improve sales results.
          </p>
        </div>
      </section>
    </main>
  );
}
