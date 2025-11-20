
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/prisma";

export async function adminGetCourses() {
  await requireAdmin();
  const data = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      price: true,
      level: true,
      status: true,
      fileKey: true,
      slug: true,
    },
  });
  return data;
}

export type AdminGetCourseType = Awaited<
  ReturnType<typeof adminGetCourses>>[0];
