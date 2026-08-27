"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateLeadForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        budget,
        location,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Failed to create lead");
      return;
    }

    setName("");
    setEmail("");
    setPhone("");
    setBudget("");
    setLocation("");

    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded border p-4"
    >
      <h2 className="text-xl font-bold">
        Add New Lead
      </h2>

      {error && (
        <p className="text-red-600">
          {error}
        </p>
      )}

      <input
        className="w-full rounded border p-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full rounded border p-2"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full rounded border p-2"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        className="w-full rounded border p-2"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <input
        className="w-full rounded border p-2"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white"
      >
        Create Lead
      </button>
    </form>
  );
}
