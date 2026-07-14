import { NextResponse } from "next/server";
import { fetchRates } from "@/lib/rates";

export const runtime = "nodejs";
// Ручное обновление из виджета должно отдавать свежие данные, а не ISR-кеш.
export const dynamic = "force-dynamic";

export async function GET() {
  const rates = await fetchRates({ fresh: true });
  if (!rates) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
  return NextResponse.json(rates);
}
