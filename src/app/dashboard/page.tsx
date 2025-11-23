import { EmptyState } from "@/components/general/empty-state"
import { getAllCourses } from "../data/course/get-all-courses"
import { getEnrolledCourses } from "../data/user/get-enrolled-courses"
import { PublicCourseCard } from "../(public)/_components/PublicCourseCard"
import Link from "next/link"


export default async function DashBoardPage() {
    const [allCourses, enrolledCourses] = await Promise.all([
        getAllCourses(),
        getEnrolledCourses()
    ])
    return (
        <>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Enrolled Courses</h1>
                <p className="text-muted-foreground">Here you can manage your enrolled courses</p>
            </div>
            {enrolledCourses.length === 0 ? (
                <EmptyState title="No Enrolled Courses" description="You have not enrolled in any courses yet" buttonText="Enroll in a course" href="/courses" />
            ) : (
                <div>
                    {enrolledCourses.map((course) => (
                        <Link key={course.course.id} href={`/dashboard/${course.course.slug}`}>
                            {course.course.title}
                        </Link>
                    ))}
                </div>
            )}
            <section>
                <div className="flex flex-col gap-2 mb-6">
                    <h1 className="text-3xl font-bold">Available Courses</h1>
                    <p className="text-muted-foreground">Here you can enroll in available courses</p>
                </div>

                {allCourses.filter((course) => !enrolledCourses.some(({ course: enrolled }) => enrolled.id === course.id)).length === 0 ? (<EmptyState title="No Available Courses" description="You have not enrolled in any courses yet" buttonText="Enroll in a course" href="/courses" />) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {

                            allCourses.filter((course) => !enrolledCourses.some(({ course: enrolled }) => enrolled.id === course.id)).map((course) => (
                                <PublicCourseCard key={course.id} data={course} />
                            ))
                        }
                    </div>

                )

                }


            </section>
        </>
    )
}