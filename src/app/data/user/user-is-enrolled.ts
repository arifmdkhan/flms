import "server-only";

import { getServerSession } from "@/lib/get-session";
import { prisma } from "@/lib/prisma";

export async function checkIfCourseBought(courseId: string): Promise<boolean> {
    const session = await getServerSession()

    if (!session?.user) return false;

    const enrollment = await prisma.enrollment.findUnique({
        where: {
            userId_courseId: {
                courseId: courseId,
                userId: session.user.id
            }
        },
        select: {
            status: true,
        }
    })

    return enrollment?.status === 'Active' ? true : false;
}