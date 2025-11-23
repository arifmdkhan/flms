import "server-only";

import { notFound } from "next/navigation";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/prisma";

export async function adminGetLesson(lessonId: string) {
    await requireAdmin();

    const data = await prisma.lesson.findUnique({
        where: {
            id: lessonId,
        },
        select: {
            id: true,
            title: true,
            description: true,
            thumbnailKey: true,
            position: true,
            videoKey: true,
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export type AdminLessonType = Awaited<ReturnType<typeof adminGetLesson>>;