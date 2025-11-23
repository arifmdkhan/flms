import "server-only";

import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { cache } from "react";

export const requireAdmin = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return redirect("/login");
  }
  if (session.user.role !== "admin") {
    return redirect("/not-admin");
  }
  return session;
});

// export async function requireAdmin() {
//   // const session=await auth.api.getSession({ headers: await headers() });
//   const session = await getServerSession();

//   if (!session) {
//     return redirect("/login");
//   }

//   if (session.user.role !== "admin") {
//     return redirect("/not-admin");
//   }

//   return session;
// }
