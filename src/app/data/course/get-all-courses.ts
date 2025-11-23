
import "server-only";
import { prisma } from "@/lib/prisma";

export async function getAllCourses() {
//   await new Promise((resolve) => setTimeout(resolve, 5000));
  const data = await prisma.course.findMany({
    where: {
      status: "Published",
    },
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
      fileKey: true,
      slug: true,
      category: true,
    },
  });
  return data;
}

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];
