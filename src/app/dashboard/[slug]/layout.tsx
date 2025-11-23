import { ReactNode } from "react";
import { CourseSidebar } from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

interface CourseLayoutProps {
    params: Promise<{ slug: string }>
    children: ReactNode

}

export default async function CourseLayout({ children, params }: CourseLayoutProps) {
    const { slug } = await params;
    const courseSidebarData = await getCourseSidebarData(slug)


    return (
        <>
            <div className="flex flex-1">
                <div className="w-80 border-r border-border shrink-0">
                    <CourseSidebar course={courseSidebarData.course} />
                </div>
                <div className="flex-1 overflow-hidden">
                    {children}
                </div>

            </div>
        </>
    )
}