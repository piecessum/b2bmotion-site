import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const LeadSchema = z.object({
  scope: z.string().trim().min(1).max(500),
  wholesale: z.enum(["yes", "no"]),
  catalogSize: z.string().trim().min(1).max(100),
  catalogStorage: z.enum(["1c", "excel", "other"]),
  name: z.string().trim().min(1).max(200),
  phone: z
    .string()
    .trim()
    .regex(/^[\d+\s()\-]{7,}$/u, "phone"),
  email: z.string().trim().email().max(200),
  page: z.string().max(500).optional().default(""),
  submittedAt: z.string().optional(),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  console.log("[lead]", JSON.stringify(lead));

  return NextResponse.json({ ok: true });
}
