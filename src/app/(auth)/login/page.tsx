import { getServerSession } from "@/lib/get-session";
import { LoginForm } from "./_components/login-form";
import { redirect } from "next/navigation";


export default async function LoginPage() {
const session=await getServerSession()

if(session) redirect('/')
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
