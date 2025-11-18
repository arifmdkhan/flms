"use client"

import { Button, buttonVariants } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import useSignOut from "@/hooks/use-signout";

const Navbar = () => {
  const handleSignout = useSignOut()

  const { data: session } = authClient.useSession()


  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
        <h1>FinLume LMS</h1>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">


          {
            session ?
              <div>

                <Button className="mr-2" onClick={handleSignout}>Logout</Button>
                 <Link className={buttonVariants({ variant: 'outline' })} href={'/admin'}>Dashboard</Link>
              </div>
              : <Link className={buttonVariants({ variant: 'outline' })} href={'/login'}>Login</Link>
          }
         
          <ThemeToggle />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
