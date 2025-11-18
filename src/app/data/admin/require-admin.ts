import "server-only";

import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  // const session=await auth.api.getSession({ headers: await headers() });
  const session = await getServerSession();

  if (!session) {
    return redirect("/login");
  }

  if (session.user.role !== "admin") {
    return redirect("/not-admin");
  }

  return session;
}
