import { redirect } from "next/navigation";

export default function CasesPage() {
  redirect("/blog?tab=cases");
}
