import "server-only";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "./require-admin";

export async function adminGetDashboardStats() {
  await requireAdmin();

  const [totalSignup, totalCustomers, totalCourses, totalLessons] =
    await Promise.all([
      prisma.user.count(),

      //total customers
      prisma.user.count({
        where: {
          enrollment: {
            some: {},
          },
        },
      }),

      prisma.course.count(),
      prisma.lesson.count(),
    ]);

  return { totalSignup, totalCustomers, totalCourses, totalLessons };
}
