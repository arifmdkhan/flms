import {
  Users,
  UserCheck,
  BookOpen,
  PlayCircle
} from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { adminGetDashboardStats } from "@/app/data/admin/admin-get-dashboard-stats";

export async function SectionCards() {
  const { totalSignup, totalCustomers, totalCourses, totalLessons } = await adminGetDashboardStats()



  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      {/* Card 1: Total Signup */}
      <Card className="@container/card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription>Total Signup</CardDescription>
            <Users className="size-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalSignup}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Registered user on the platform</p>
        </CardFooter>
      </Card>

      {/* Card 2: Total Customers */}
      <Card className="@container/card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription>Total Customers</CardDescription>
            <UserCheck className="size-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalCustomers}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">User Enrolled in courses</p>
        </CardFooter>
      </Card>

      {/* Card 3: Total Courses */}
      <Card className="@container/card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription>Total Courses</CardDescription>
            <BookOpen className="size-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalCourses}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">My Courses on the platform</p>
        </CardFooter>
      </Card>

      {/* Card 4: Total Lessons */}
      <Card className="@container/card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardDescription>Total Lessons</CardDescription>
            <PlayCircle className="size-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalLessons}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Total Lessons available</p>
        </CardFooter>
      </Card>

    </div>
  )
}
