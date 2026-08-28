import { describe, expect, it } from "vitest";

import { createLeadSchema } from "../create-lead";

describe("createLeadSchema", () => {
  it("accepts valid lead data", () => {
    const result = createLeadSchema.safeParse({
      name: "Ahmed Khan",
      email: "ahmed@example.com",
      phone: "03001234567",
      budget: "5000000",
      location: "Karachi",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = createLeadSchema.safeParse({
      name: "Ahmed Khan",
      email: "invalid-email",
    });

    expect(result.success).toBe(false);
  });
});
