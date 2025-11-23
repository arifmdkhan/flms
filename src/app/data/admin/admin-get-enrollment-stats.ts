import "server-only";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "./require-admin";

export async function adminGetEnrollmentStats() {
  await requireAdmin();

  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  // SQL aggregation instead of returning thousands of rows
  const raw = await prisma.$queryRaw<
    { date: string; count: number }[]
  >`
    SELECT 
      TO_CHAR("createdAt", 'YYYY-MM-DD') as date,
      COUNT(*) as count
    FROM "Enrollment"
    WHERE "createdAt" >= ${thirtyDaysAgo}
    GROUP BY 1
    ORDER BY 1 ASC
  `;

  const map = new Map(raw.map(r => [r.date, Number(r.count)]));

  const result: { date: string; enrollments: number }[] = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().split("T")[0];

    result.push({
      date: key,
      enrollments: map.get(key) ?? 0,
    });
  }

  return result;
}
