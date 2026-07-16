import { NextResponse } from "next/server";
import { z } from "zod";
import { isValidRuPhone } from "@/lib/phone";

export const runtime = "nodejs";

const LeadSchema = z.object({
  scope: z.string().trim().min(1).max(500),
  wholesale: z.enum(["yes", "no"]),
  catalogSize: z.string().trim().min(1).max(100),
  catalogStorage: z.enum(["1c", "excel", "other"]),
  name: z.string().trim().min(1).max(200),
  phone: z.string().trim().max(30).refine(isValidRuPhone, "phone"),
  email: z.string().trim().email().max(200),
  // Ханипот: настоящие пользователи это поле не видят и не заполняют.
  website: z.string().max(200).optional(),
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

  // Ханипот сработал → это бот. Молча отвечаем «ок», ничего не обрабатывая,
  // чтобы не подсказывать боту про фильтр.
  if (lead.website && lead.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { website: _hp, ...cleanLead } = lead;
  console.log("[lead]", JSON.stringify(cleanLead));

  return NextResponse.json({ ok: true });
}
