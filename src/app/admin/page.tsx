import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { adminGetEnrollmentStats } from "../data/admin/admin-get-enrollment-stats";

export default async function AdminIndexPage() {

  const enrollmentsData = await adminGetEnrollmentStats()

  return (
    <>
      <SectionCards />

      <ChartAreaInteractive data={enrollmentsData} />


    </>

  )

}
