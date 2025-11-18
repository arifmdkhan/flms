import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";


export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Link href='/' className={buttonVariants({
                variant:"outline",
                className:"absolute top-4 left-4"
            })}>
                <ArrowLeft className="size-4" />Back
            </Link>
            {children}
        </div>
    )
}