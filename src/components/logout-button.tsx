"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { signOut } = useClerk();
  const router = useRouter();

  async function logout() {
    await signOut();
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="rounded bg-black px-4 py-2 text-white"
    >
      Logout
    </button>
  );
}
